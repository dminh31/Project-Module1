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
} else {
    document.getElementById("updateUser").innerHTML =
        `
        <div onclick="linkSignIn()">Đăng nhập</div>
        <div onclick="linkSignUp()">Đăng kí</div>
    `
}

const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("search-box");
searchIcon.addEventListener('click', function () {
    if (searchBox.style.display === 'block') {
        searchBox.style.display = 'none';
    } else {
        searchBox.style.display = 'block';
    }
});

function clickLogo() {
    window.location.href = "./index.html"
}

function signout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

function linkSignIn() {
    window.location.href = "./page/signin.html"
}

function linkSignUp() {
    window.location.href = "./page/signup.html"
}

// ham khi ma thay doi anh
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

let iconCart = document.getElementById("icon-cart")
function linkCart() {
    window.location.href = "./page/cart.html"
}

function showMore() {
    window.location.href = "./page/product.html"
}

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

const products = JSON.parse(localStorage.getItem("products")) || []

function render(data, htmlID) {
    let stringHTML = ""
    for (let i = 0; i < data.length; i++) {
        stringHTML +=
            `
            <div class="image-product" onclick="gotoDetail('${data[i].id}')">
                <img src="${data[i].image}" alt="">
                <div class="content">
                    <h4>${data[i].name}</h4>
                    <p>${VND.format(data[i].price)}</p>
                </div>
            </div>
        `
    }
    document.getElementById(htmlID).innerHTML = stringHTML
}

function renderProduct(htmlId) {
    if (products.length <= 4) {
        render(products, htmlId)
    } else {
        let data = []
        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * products.length)
            data.push(products[index])
            products.splice(index, 1)
        }
        console.log(data);
        render(data, htmlId)
    }
}
renderProduct("product")
renderProduct("product-1")

function gotoDetail(idProduct) {
    localStorage.setItem("idProductDetail", JSON.stringify(idProduct))
    window.location.href = "page/producDetail.html"
}

window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.documentElement.scrollTop > 80) {
        document.getElementsByClassName("head")[0].classList.add("changeColor")
        return
    }
    document.getElementsByClassName("head")[0].classList.remove("changeColor")
}