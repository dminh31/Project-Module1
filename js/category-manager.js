function renderCategory() {
    const category = JSON.parse(localStorage.getItem("category")) || []
    let stringHTML = ""
    for (let i = 0; i < category.length; i++) {
        stringHTML +=
            `
            <tr>
                <td>${category[i].id}</td>
                <td>${category[i].name}</td>
                <td>
                    <button onclick="clickUpdateCategory(${category[i].id})">Update</button>
                    <button onclick="deleteCategory(${i})">Delete</button>
                </td>

            </tr>
        `
    }
    document.getElementById("table_body").innerHTML = stringHTML
}
renderCategory()

function addCategory() {
    const category = JSON.parse(localStorage.getItem("category")) || []
    const categoryInput = document.getElementById("input_category").value
    if (!categoryInput) {
        alert("Ban chua nhap !")
        return
    }
    let id
    if (category.length == 0) {
        id = 1
    } else {
        id = category[category.length - 1].id + 1
    }
    category.push({
        id,
        name: categoryInput
    })
    localStorage.setItem("category", JSON.stringify(category))
    document.getElementById("input_category").value = ""
    renderCategory()
}

function deleteCategory(index) {
    const category = JSON.parse(localStorage.getItem("category")) || []
    let result = confirm("bạn chắc chưa???")
    if (result) {
        category.splice(index, 1)
        localStorage.setItem("category", JSON.stringify(category))
        renderCategory()
    }
}

let idUpdate
function clickUpdateCategory(id) {
    const category = JSON.parse(localStorage.getItem("category")) || []
    idUpdate = id
    const info = category.find(item => item.id === id)
    document.getElementById("input_category").value = info.name
}

function updateCategory() {
    const category = JSON.parse(localStorage.getItem("category")) || []
    const index = category.findIndex(item => item.id === idUpdate)

    const categoryInput = document.getElementById("input_category").value
    if (!categoryInput) {
        alert("Ban chua nhap !")
        return
    }

    category[index].name = categoryInput
    localStorage.setItem("category", JSON.stringify(category))
    document.getElementById("input_category").value = ""
    renderCategory()
    idUpdate = null
}

// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById('sidebar');

function openSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add('sidebar-responsive');
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if (sidebarOpen) {
        sidebar.classList.remove('sidebar-responsive');
        sidebarOpen = false;
    }
}

function clickLogo() {
    window.location.href = "http://127.0.0.1:5501/index.html"
}
