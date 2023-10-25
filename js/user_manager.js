function renderUser() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    let stringHTML = ""
    for (let i = 0; i < users.length; i++) {
        stringHTML +=
            `
                    <tr>
                        <td>${users[i].id}</td>
                        <td>${users[i].email}</td>
                        <td>${users[i].username}</td>
                        <td>${users[i].status ? "Active" : "Ban"}</td>
                        <td>
                            <button class="btnStatus"  onclick="changeStatus(${i})">${users[i].status ? "Ban" : "Unban"}</button>
                        </td>
                    </tr>
                `
    }
    document.getElementById("table_body").innerHTML = stringHTML
}
renderUser()

function changeStatus(index) {
    const users = JSON.parse(localStorage.getItem("users")) || []
    users[index].status = !users[index].status
    localStorage.setItem("users", JSON.stringify(users))
    renderUser()
}

function clickLogo() {
    window.location.href = "http://127.0.0.1:5501/index.html"
}