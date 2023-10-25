let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let users = JSON.parse(localStorage.getItem("users"))
function checkInfo() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}

    if (currentUser.id) {
        document.getElementById("updateUser").innerHTML =
            `
                <div onclick="signout()">Đăng xuất</div>
            `
        if (!currentUser.image) {
        document.getElementById("avatar").src = "./img/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
        } else {
        document.getElementById("avatar").src = currentUser.image
        }
        document.getElementById("countItem").innerHTML = currentUser.cart.length
    } else {
        document.getElementById("updateUser").innerHTML =
            `
            <div onclick="linkSignIn()">Đăng nhập</div>
            <div onclick="linkSignUp()">Đăng kí</div>
        `
    }
}
checkInfo()

const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("search-box");
searchIcon.addEventListener('click', function () {
    if (searchBox.style.display === 'block') {
        searchBox.style.display = 'none';
    } else {
        searchBox.style.display = 'block';
    }
});


function linkSignIn() {
    window.location.href = "./signin.html"
}

function linkSignUp() {
    window.location.href = "./signup.html"
}

function clickLogo() {
    window.location.href = "../index.html"
}

function signIn() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let username = document.getElementById("username").value;
    let password = document.getElementById("inputPassword").value;

    let check = false;
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            if (!users[i].status) {
                alert("Ban dang bi ban !")
                return
            }
            check = true
            localStorage.setItem("currentUser", JSON.stringify(users[i]))
            window.location.href = "../index.html"
            return;
        }
    }

    if (!check) {
        alert("Mời nhập thông tin");
    }
}

function signout() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const index = users.findIndex(user => user.id == currentUser.id)
    users[index] = currentUser
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.removeItem("currentUser")
    location.reload();
}

function changeAvatar() {
    // tro den o input
    let fileUpload = document.getElementById("change_image")
    // lay thong tin anh trong o input
    let file = fileUpload.files[0];
    // khai bao mot doi tuong de ma hoa anh
    var reader = new FileReader();
    // bat dau ma hoa
    reader.onloadend = function () {
        // ket qua
        let image = reader.result
        // gan ket qua cho anh tren man hinh
        document.getElementById("avatar").src = image
        // cap nhat thong tin user dang login
        currentUser.image = image
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        // cap nhat thong tin luu tru users
        const users = JSON.parse(localStorage.getItem("users"))
        const index = users.findIndex(user => user.id == currentUser.id)
        users[index] = currentUser
        localStorage.setItem("users", JSON.stringify(users))
    }
    reader.readAsDataURL(file);
}

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

function renderBillUser() {
    let bills = JSON.parse(localStorage.getItem("bills"))
    const products = JSON.parse(localStorage.getItem("products")) || []
    let stringHTML = ""
    let stringCart = ""

    const data = bills.filter(bill => bill.userId == currentUser.id)

    for (let i = 0; i < data.length; i++) {
        let cart = data[i].cart
        stringCart = ""

        for (let j = 0; j < cart.length; j++) {
            let product = products.find(item => item.id == cart[j].idSP)
            stringCart +=
                `
                <div>
                    <img width="50px" src="${product.image}" />
                    <br>
                    <span>${product.name}</span> <br>
                    <span>Price:${VND.format(product.price)}</span> <br>
                    <span>Quantity : ${cart[j].quantity}</span>
                </div>
            `
        }

        stringHTML +=
            `
        <tr>
            <td>${i + 1}</td>
            <td>${Math.floor(Math.random() * 999999)}</td>
            <td>${stringCart}</td>
            <td>${VND.format(data[i].totalPrice)}</td>
            <td>${data[i].status == 0 ? "Đang chờ" : data[i].status == 1 ? "Đồng ý" : "Từ chối"}</td>
            <td>${data[i].status == 0 ?
                ` <button class="btnBillUser" onclick="changeStatus('${i}', 2)">Hủy</button> ` : ""}
            </td>
        </tr>
        `
    }
    document.getElementById("tbody_billUser").innerHTML = stringHTML
}
renderBillUser()

function changeStatus(index, status) {
    let bills = JSON.parse(localStorage.getItem("bills"))
    bills[index].status = status
    localStorage.setItem("bills", JSON.stringify(bills))
    renderBillUser()
}