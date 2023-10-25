const usernameError = document.getElementById("username-error")
const passwordError = document.getElementById("password-error")

function signIn() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let username = document.getElementById("username").value;
    let password = document.getElementById("inputPassword").value;

    let check = false;
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            if (!users[i].status) {
                handleSnackbar("Ăn Bannnnnnn !")
                return;
            }

            if (username === "" || password === "") {
                handleSnackbar("Nhập thông tin")
                return
            }

            check = true
            localStorage.setItem("currentUser", JSON.stringify(users[i]))
            handleSnackbar("Đăng nhập thành công")
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 2000);
            return;
        }
    }
    if (username === "admin" && password === "admin") {
        window.location.href = "../admin/users-manager.html"
        return;
    }

    if (!check) {
        handleSnackbar("Tài khoản không tồn tại!");
    }
}

function validate(data) {
    const { username, password } = data

    const regexName = /^\w{5,}$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    let check = true;
    if (!regexName.test(username)) {
        usernameError.innerHTML = "Tên phải nhiều hơn 5 kí tự"
        check = false;
    } else {
        usernameError.innerHTML = ""
    }

    if (!regexPassword.test(password)) {
        passwordError.innerHTML = "Password có ít nhất 6 kí tự"
        check = false;
    } else {
        passwordError.innerHTML = ""
    }

    return check;
}

function handleSnackbar(param) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = param;
    document.body.appendChild(snackbar);

    setTimeout(() => {
        snackbar.remove();
    }, 3000);
}
