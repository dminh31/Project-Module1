// let listProduct = JSON.parse(localStorage.getItem("listProduct"));
// let categories = JSON.parse(localStorage.getItem("category"));
// let products = [
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

// let categories = [
//     { id: 1, name: "Leninn" },
//     { id: 2, name: "Deck" },
//     { id: 3, name: "Clothing" },
// ]

function clickLogo() {
    window.location.href = "http://127.0.0.1:5501/index.html"
}

let category = JSON.parse(localStorage.getItem("category")) || []
let stringHTML = ""
for (let i = 0; i < category.length; i++) {
    stringHTML +=
        `
        <option value=${category[i].id}>${category[i].name}</option>
    `
}
document.getElementById("select_category").innerHTML = stringHTML


// localStorage.setItem("category", JSON.stringify(categories))
// ham khi ma thay doi anh
let dataIamge = ""
function changeAvatar() {
    // lay thong tin anh trong o input
    let file = document.getElementById("imgProduct").files[0]

    // khai bao mot doi tuong de ma hoa anh
    var reader = new FileReader();


    reader.onloadend = function () {
        // ket qua
        dataIamge = reader.result
        // gan ket qua cho anh tren man hinh
        document.getElementById("image").src = dataIamge
        // cap nhat thong tin user dang login
    }
    reader.readAsDataURL(file);
}



function createProduct() {
    // tao mot object chua du lieu
    const infoNewProduct = {
        name: document.getElementById("nameProduct").value,
        price: document.getElementById("priceProduct").value,
        quantity: document.getElementById("quantity").value,
        image: dataIamge,
        id: Math.floor(Math.random() * 99999),
        category: document.getElementById("select_category").value
    }

    console.log("==> info: ", infoNewProduct);
    // gui du lieu len local: products
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(infoNewProduct)
    localStorage.setItem("products", JSON.stringify(products));
    // reset form
    document.getElementById("nameProduct").value = ""
    document.getElementById("priceProduct").value = ""
    document.getElementById("quantity").value = ""
    dataIamge = ""
    document.getElementById("image").src = ""
    // ve giao dien
    renderProduct()
}

function renderProduct() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let text = "";
    text +=
        `
    <tr>
    <th>Id</th>
    <th>Tên sản phẩm</th>
    <th>Ảnh</th>
    <th>Giá</th>
    <th>Số lượng</th>
    <th>Category</th>
    <th>Chức năng</th>
    </tr>
    `
    for (let i = 0; i < products.length; i++) {
        text +=
            `
        <tr>
        <td>${products[i].id}</td>
        <td>${products[i].name}</td>
        <td><img src="${products[i].image}" width="100px" height="100px"</td>
        <td>${products[i].price}</td>
        <td>${products[i].quantity}</td>
        <td>${products[i].category}</td>
        <td>
            <button class="btnTable" onclick="editBtn('${products[i].id}')">Edit</button>
            <button class="btnTable" onclick="deleteBtn('${products[i].id}')">Delete</button>
        </td>
    </tr>
        `
    }
    document.getElementById("tableAdded").innerHTML = text;
}
renderProduct()

function deleteBtn(id) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const index = products.findIndex(product => product.id == id)
    console.log(index);
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProduct()
}


let productUpdate
// truyền thông tin cần sửa lên 
function editBtn(id) {
    const products = JSON.parse(localStorage.getItem("products"))
    let editProduct = products.find(product => product.id == id)
    console.log("==>", editProduct);
    document.getElementById("nameProduct").value = editProduct.name;
    document.getElementById("priceProduct").value = editProduct.price;
    document.getElementById("quantity").value = editProduct.quantity;
    document.getElementById("select_category").value = editProduct.category
    dataIamge = editProduct.image
    document.getElementById("image").src = dataIamge
    productUpdate = editProduct
}

function editButton() {
    const products = JSON.parse(localStorage.getItem("products"))
    let index = products.findIndex(product => product.id == productUpdate.id)

    const newInfo = {
        id: productUpdate.id,
        name: document.getElementById("nameProduct").value,
        price: document.getElementById("priceProduct").value,
        quantity: document.getElementById("quantity").value,
        category: document.getElementById("select_category").value,
        image: dataIamge
    }

    products[index] = newInfo
    localStorage.setItem("products", JSON.stringify(products))

    document.getElementById("nameProduct").value = ""
    document.getElementById("priceProduct").value = ""
    document.getElementById("quantity").value = ""
    dataIamge = ""
    document.getElementById("image").src = ""

    renderProduct()
}
