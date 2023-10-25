// let arrProducts = [
//     {
//         id: uuid(),
//         name: "deck1",
//         img: "../img/deck1-E4iSPj_800x800.png",
//         price: 800000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "deck2",
//         img: "../img/deck2-687pAh_800x800.png",
//         price: 800000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "blank grip",
//         img: "../img/blank-grip-0_800x800.png",
//         price: 800000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "blank bearings",
//         img: "../img/blank-bearings-0_800x800.png",
//         price: 800000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "leninn-rakkiu ",
//         img: "../img/leninn-rakkiu-co-gai-RhpF5N_800x800.png",
//         price: 800000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "leninn-rakkiuuuu ",
//         img: "../img/leninn-rakkiu-con-vit-KObfGU_800x800.png",
//         price: 800000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "leninn-rakkiuuuu ",
//         img: "../img/rakkiu-0283-hlN7XE_800x800.png",
//         price: 5000000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "leninn-rakkiuuuu ",
//         img: "../img/paradol-deck-0_800x800.png",
//         price: 5000000,
//         quantity: 10,
//         category: 1,
//     },
//     {
//         id: uuid(),
//         name: "leninn-lemia",
//         img: "../img/lemia-00075a-Zc7MuL_800x800.png",
//         price: 500000,
//         quantity: 10,
//         category: 1,
//     }
// ];
// localStorage.setItem("arrProducts",JSON.stringify(arrProducts));

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

function signout() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const index = users.findIndex(user => user.id == currentUser.id)
    users[index] = currentUser
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.removeItem("currentUser")
    location.reload();
}

let arrListProduct = JSON.parse(localStorage.getItem("arrProducts"));

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

function uuid() {
    return Math.floor(Math.random() * 999999) + new Date().getMilliseconds();
}

function renderCategory() {
    const categories = JSON.parse(localStorage.getItem("category")) || []
    let stringHTML = '<button class="btnCate" onclick="renderProduct()">All</button>'
    categories.forEach(element => {
        stringHTML +=
            `
            <button class="btnCate" onclick="renderProduct(${element.id})">${element.name}</button>
        `
    });
    document.getElementById("category_product").innerHTML = stringHTML
}
renderCategory()


let realProducts
let currentPage = 1
let itemsPerPage = 8

function searchItem() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let searchValue = document.getElementById("search-text").value.toLowerCase();
    let searchProduct = products.filter((item) => {
        return item.name.toLowerCase().includes(searchValue);
    })
    renderProduct()
    let totalPage = Math.ceil(searchProduct.length / itemsPerPage);
    let pages = ""
    for (let i = 1; i <= totalPage; i++) {
        pages +=
            `
            <button class="btnPage" href="#" onclick ="changePage(${i})">${i}</button>
        `
    }
    document.getElementById("pagination").innerHTML = pages
    document.getElementsByClassName("btnPage")[0].classList.add("bg-btn")
    let startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = currentPage * itemsPerPage
    if (endIndex > searchProduct.length) {
        endIndex = searchProduct.length
    }

    let stringHTML = "";
    for (let i = startIndex; i < endIndex; i++) {
        stringHTML +=
            `
            <div class="content">
                <img height="420px" src="${searchProduct[i].image}" alt="" />
                <p>${searchProduct[i].name}</p>
                <p> ${VND.format(searchProduct[i].price)}</p>
                <button class="buyBtn" onclick="buy(${searchProduct[i].id})">Mua</button>
            </div>
        `
    }
    document.getElementById("listOrder").innerHTML = stringHTML;

}

function renderProduct(categoryID) {
    const arrProducts = JSON.parse(localStorage.getItem("products")) || []
    realProducts = arrProducts
    if (categoryID) {
        realProducts = arrProducts.filter(item => item.category == categoryID)
    }
    let totalPage = Math.ceil(realProducts.length / itemsPerPage);
    let pages = ""
    for (let i = 1; i <= totalPage; i++) {
        pages +=
            `
            <button class="btnPage" href="#" onclick ="changePage(${i})">${i}</button>
        `
    }
    document.getElementById("pagination").innerHTML = pages
    document.getElementsByClassName("btnPage")[0].classList.add("bg-btn")

    let startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = currentPage * itemsPerPage
    if (endIndex > realProducts.length) {
        endIndex = realProducts.length
    }
    let stringHTML = "";
    for (let i = startIndex; i < endIndex; i++) {
        stringHTML +=
            `
            <div class="content">
                <img height="420px" src="${realProducts[i].image}" alt="" />
                <p>${realProducts[i].name}</p>
                <p> ${VND.format(realProducts[i].price)}</p>
                <button class="buyBtn" onclick="buy(${realProducts[i].id})">Mua</button>
            </div>
        `
    }
    document.getElementById("listOrder").innerHTML = stringHTML;
}
renderProduct()

function changePage(page) {
    currentPage = page
    renderProduct()
    let btnNow = document.getElementsByClassName("btnPage")
    for (let i = 0; i < btnNow.length; i++) {
        if (i + 1 == page) {
            btnNow[i].classList.add("bg-btn");
        } else {
            btnNow[i].classList.remove("bg-btn");
        }
    }
}

// function toPrevPage() {
//     currentPage--;
//     if (currentPage < 1) {
//         currentPage = 3
//     }
//     renderProduct()
// }

// function toNextPage() {
//     currentPage++;
//     let totalPage = Math.ceil(realProducts.length / itemsPerPage)
//     if (currentPage > totalPage) {
//         currentPage = totalPage
//     }
//     renderProduct()
// }


function linkCart() {
    window.location.href = "../page/cart.html"
}


let users = JSON.parse(localStorage.getItem("users"));
let arrProducts = JSON.parse(localStorage.getItem("products")) || []
function buy(id) {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        handleSnackbar("Bạn chưa đăng nhập");
        return
    }

    let cart = currentUser.cart
    if (currentUser == null) {
        window.location.href = "../page/signin.html"
    }
    let product = cart.find((product) => product.idSP == id)
    if (!product) {
        cart.push({
            idSP: id,
            quantity: 1
        });
    } else {
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