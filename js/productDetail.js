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

function checkInfo() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}

    if (currentUser.id) {
        document.getElementById("updateUser").innerHTML =
            `
                <div onclick="signout()">Đăng xuất</div>
        `
        if (!currentUser.image) {
            document.getElementById("avatar").src =
                "./img/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
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

function signout() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const index = users.findIndex(user => user.id == currentUser.id)
    users[index] = currentUser
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.removeItem("currentUser")
    location.reload();
}

const idProductDetail = JSON.parse(localStorage.getItem("idProductDetail"))
const products = JSON.parse(localStorage.getItem("products"))
const product = products.find(product => product.id == idProductDetail)
const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

document.getElementById("image").src = product.image
document.getElementById("name").innerHTML = product.name
document.getElementById("price").innerHTML = VND.format(product.price)

function linkCart() {
    window.location.href = "../page/cart.html"
}


function buy() {
    let users = JSON.parse(localStorage.getItem("users"))
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        handleSnackbar("Bạn chưa đăng nhập");
        if (currentUser == null) {
            window.location.href = "../page/signin.html"
        }
        return
    }

    let cart = currentUser.cart
    let product = cart.find((product) => product.idSP == idProductDetail)
    if (!product) {
        cart.push({
            idSP: idProductDetail,
            quantity: 1
        });
    }else{
        handleSnackbar("Bạn đã thêm sản phẩm vào giỏ hàng !!!")
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    let index = users.findIndex((user) => user.id === currentUser.id)
    users[index].cart = cart;
    localStorage.setItem("users", JSON.stringify(users))
    document.getElementById("countItem").innerHTML = cart.length
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