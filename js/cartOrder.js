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

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

let totalPrice = 0
function showOrder() {
    const products = JSON.parse(localStorage.getItem("products"))
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let total = 0
    let cartUser = currentUser.cart;
    console.log(cartUser);
    let text = "";
    for (let j = 0; j < cartUser.length; j++) {
        // let product = products.find(item => item.id == cartUser[j].idSP)
        let product = products.find(item => item.id == cartUser[j].idSP)
        total += cartUser[j].quantity * product.price;
        text +=
            `
            <td>${j + 1}</td>
            <td><img src="${product.image}" width="100px" /></td>
            <td>${product.name}</td>
            <td>${VND.format(product.price)}</td>
            <td>
              <button class="cartBtn" onclick="changeStatus(${j}, 0)">-</button>
              <span>${cartUser[j].quantity}</span>
              <button class="cartBtn" onclick="changeStatus(${j}, 1)">+</button>
            </td>
            <td><span>${VND.format(cartUser[j].quantity * product.price)}</span>
            </td>
            <td><button class="cartBtn" onclick="removeItem(${j})">Xóa</button></td>
          </tr>
        `
    }
    document.getElementById("showOrder").innerHTML = text
    document.getElementById("countItem").innerHTML = currentUser.cart.length
    document.getElementById("totalOrder").innerHTML = VND.format(total)
    totalPrice = total
}
showOrder()

function removeItem(index) {
    let result = confirm("Bạn chắc chắn muốn hủy?")
    if (result) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let cartUser = currentUser.cart;
        cartUser.splice(index, 1);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        showOrder();
    }
}

function changeStatus(index, status) {
    const products = JSON.parse(localStorage.getItem("products"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let cartUser = currentUser.cart;
    let product = products.find(item => item.id == cartUser[index].idSP)
    if (status == 0) {
        if (cartUser[index].quantity - 1 > 0) {
            cartUser[index].quantity -= 1
        }
    } else {
        if (cartUser[index].quantity + 1 <= product.quantity) {
            cartUser[index].quantity += 1
        }
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    showOrder()
}



function payments() {

    // let fullName = document.getElementById("inputName").value;
    // let address = document.getElementById("inputAdd").value;
    // let phoneNumber = document.getElementById("inputPhone").value;
    // let fullNameError = document.getElementById("fullNameError");
    // let addressError = document.getElementById("addressError");
    // let phoneNumberError = document.getElementById("phoneError");

    // let regexPhone = /^0\d{9,10}$/
    // let check = true
    // if (fullName == "") {
    //     fullNameError.innerHTML = "Nhập đầy đủ Họ Tên"
    //     check = false;
    // } else {
    //     fullNameError.innerHTML = ""
    // }
    // if (address == "") {
    //     addressError.innerHTML = "Nhập Địa Chỉ Thường Trú"
    //     check = false;
    // } else {
    //     addressError.innerHTML = ""
    // }
    // if (!regexPhone.test(phoneNumber)) {
    //     phoneNumberError.innerHTML = "Số điện thoại không hợp lệ"
    //     check = false;
    // } else {
    //     phoneNumberError.innerHTML = "";
    // }

    // if (!check) {
    //     return
    // }

    window.location.href = "../page/bill.html"
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let users = JSON.parse(localStorage.getItem("users")) || {}
    const newBill = {
        id: Math.ceil(Math.random() * 9999999),
        userId: currentUser.id,
        cart: currentUser.cart,
        status: 0,
        totalPrice,
        username: currentUser.username,

    }
    const bill = JSON.parse(localStorage.getItem("bills")) || []
    bill.push(newBill);
    console.log(bill);
    localStorage.setItem("bills", JSON.stringify(bill));

    currentUser.cart = [];
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    let index_user = users.findIndex((user) => user.id === currentUser.id)
    users[index_user].cart = []
    localStorage.setItem("users", JSON.stringify(users))
    console.log(users.cart);

    showOrder()

}
// ấn thanh toán
// tạo bill
/*
    bill = {
        id: ....,
        user_id,
        cart: [],
        status: "Chờ xác nhận"
    }
*/
// push bill vào mảng bills trên local
// xóa giỏ hàng của người dùng