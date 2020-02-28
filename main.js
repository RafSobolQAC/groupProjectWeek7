let getData = () => {
    if (event) event.preventDefault();
    let request = new XMLHttpRequest();
    let orderList = document.getElementById("table-orders");
    request.open("GET", "http://localhost:8081/order/all");
    let tBody = orderList.getElementsByClassName("tbody-dark")[0];

    tBody.innerHTML = "";
    request.onload = () => {
        for (let order of JSON.parse(request.response)) {
            let tRow = document.createElement("tr");
            tRow.setAttribute("id", "order " + order["id"]);
            console.log(order);
            let newTh = document.createElement("th");
            newTh.setAttribute("scope", "row");
            newTh.innerText = order["id"];
            let priceTh = document.createElement("th");
            priceTh.innerText = "tester";
            let itemsTh = document.createElement("th");
            let functionalityTh = document.createElement("th");

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", () => {
                deleteData(order["id"]);
                getData();
            })

            tBody.appendChild(tRow);
            functionalityTh.appendChild(deleteButton);
            tRow.appendChild(newTh);
            tRow.appendChild(priceTh);
            tRow.appendChild(itemsTh);
            tRow.appendChild(functionalityTh);

        }
    }

    request.send();

}




let button = document.getElementById("create-button");
button.addEventListener("click", () => {

})

let deleteData = (id) => {
    let request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:8081/order/" + id);
    request.send();
}

getData();