let arrUser = JSON.parse(localStorage.getItem("users")) || [];
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
const usernameError = document.getElementById("username-error")
const emailError = document.getElementById("email-error")
const passwordError = document.getElementById("password-error")
const confirmPasswordError = document.getElementById("confirm-password-error")

function signUp() {
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let user = {
        cart: [],
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        id: Math.floor(Math.random() * 9999)
    };

    let isValidate = validate(user)

    if (!isValidate) {
        return
    }

    let check = true;
    for (let i = 0; i < arrUser.length; i++) {
        if (arrUser[i].email == email.value &&
            arrUser[i].username == username.value) {
            check = false;
            break;
        }
        if (arrUser[i].email == email.value) {
            handleSnackbar("Email đã tồn tại")
            return;
        }
    }
    if (check) {
        const { confirmPassword, ...data } = user
        const newInfo = {
            ...data,
            status: true
        }
        arrUser.push(newInfo);
        localStorage.setItem("users", JSON.stringify(arrUser))
        handleSnackbar("Đăng kí thành con công !!")
        setTimeout(() => {
            window.location.href = "./signin.html"
        }, 1500);
    }

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


function validate(data) {
    const { username, email, password, confirmPassword } = data

    const regexName = /^\w{5,}$/;
    const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    let check = true;
    if (!regexName.test(username)) {
        usernameError.innerHTML = "Tên phải nhiều hơn 5 kí tự"
        check = false;
    } else {
        usernameError.innerHTML = ""
    }

    if (!regexEmail.test(email)) {
        emailError.innerHTML = "Không đúng định dạng email"
        check = false;
    } else {
        emailError.innerHTML = ""
    }

    if (!regexPassword.test(password)) {
        passwordError.innerHTML = "Password có ít nhất 6 kí tự"
        check = false;
    } else {
        passwordError.innerHTML = ""
    }

    if (password != confirmPassword) {
        confirmPasswordError.innerHTML = "Nhập lại mật khẩu"
        check = false;
    } else {
        confirmPasswordError.innerHTML = ""
    }
    return check;
}