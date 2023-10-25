const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

function renderBill() {
    let bill = JSON.parse(localStorage.getItem("bills"))
    const products = JSON.parse(localStorage.getItem("products")) || []
    let stringHTML = ""
    let stringCart = ""

    for (let i = 0; i < bill.length; i++) {
        stringHTML +=
            `
         <tr style="text-align:center">
            <td>${bill[i].id}</td>
            <td>${bill[i].userId}</td>
            <td class="renderProductBill"></td>
            <td>${VND.format(bill[i].totalPrice)}</td>
            <td>${bill[i].status == 0 ? "Chờ xác nhận" : bill[i].status == 1 ? "Chấp nhận" : "Từ chối"}</td>
            <td>
                ${bill[i].status == 0 ?
                `<button class="btnBill" onclick="changeStatusBill('${i}', 1)">Đồng ý</button> 
                 <button class="btnBill" onclick="changeStatusBill('${i}', 2)">Hủy bỏ</button>`
                : ""}
            </td>
        </tr>
        `
    }
    document.getElementById("tbody_bill").innerHTML = stringHTML
    
    for (let k = 0; k < bill.length; k++) {
        let cart = bill[k].cart
        for (let j = 0; j < cart.length; j++) {
            let product = products.find(item => item.id == cart[j].idSP)
            console.log(product);
            stringCart +=
                `
                <div style= "text-align:center; margin-top:10px">
                    <img width="100px" src=${product.image} />
                    <br>
                    <span sty>${product.name}</span> <br>
                    <span>Price: ${VND.format(product.price)}</span> <br>
                    <span>Quantity: ${cart[j].quantity}</span> 
                </div>
            `
        }
        document.getElementsByClassName("renderProductBill")[k].innerHTML = stringCart
    }

}
renderBill()

function changeStatusBill(index, status) {
    const bills = JSON.parse(localStorage.getItem("bills")) || []
    bills[index].status = status
    localStorage.setItem("bills", JSON.stringify(bills))
    renderBill()
}

function clickLogo() {
    window.location.href = "http://127.0.0.1:5501/index.html"
}
