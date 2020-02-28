let createOrder = () => {

    let newOrder = new XMLHttpRequest();
    newOrder.open("POST", "http://localhost:8081/order");
    let orderId = 0;
    newOrder.onload = (() => {
        orderId = JSON.parse(newOrder.response)["id"];
    })
    newOrder.send();

    let requestItems = new XMLHttpRequest();
    requestItems.open("GET", "http://localhost:8081/item/all");
    let modal = document.getElementById("create-modal");
    let tBody = document.getElementById("create-tbody");
    requestItems.onload = () => {
        for (let item of JSON.parse(requestItems.response)) {
            let tRow = document.createElement("tr");

            let idTh = document.createElement("th");
            idTh.setAttribute("scope", "row");
            idTh.innerText = item["id"];
            let imageTd = document.createElement("td");
            let imageInTd = document.createElement("img");
            imageInTd.setAttribute("src", item["imageUrl"]);
            imageInTd.setAttribute("class", "img-fluid img-thumbnail");
            imageInTd.setAttribute("alt", item["name"]);
            imageTd.appendChild(imageInTd);


            let nameTd = document.createElement("td");
            let priceTd = document.createElement("td");
            let quantityTd = document.createElement("td");
            let addTd = document.createElement("td");

            nameTd.innerText = item["name"];
            priceTd.innerText = "£" + item["price"];

            let numberInQuantity = document.createElement("input");
            numberInQuantity.setAttribute("type", "number");
            // numberInQuantity.setAttribute("id","quant");
            numberInQuantity.setAttribute("name", "quantity");
            numberInQuantity.setAttribute("class", "quant");
            numberInQuantity.setAttribute("size", 1);
            numberInQuantity.value = 0;

            quantityTd.appendChild(numberInQuantity);

            let plusButton = document.createElement("button");
            let minusButton = document.createElement("button");

            plusButton.innerText = "+";
            minusButton.innerText = "-";
            plusButton.setAttribute("class", "btn btn-info");
            minusButton.setAttribute("class", "btn btn-danger");

            plusButton.addEventListener("click", () => {
                numberInQuantity.value = (parseInt(numberInQuantity.value) + 1);
                total.innerText = "£" + (parseFloat(total.innerText.substring(1)) + parseFloat(priceTd.innerText.substring(1)));

                let add = new XMLHttpRequest();

                add.open("POST", "http://localhost:8081/order/" + orderId + "/item/" + idTh.innerText);
                add.setRequestHeader("Content-Type", "application/json");
                add.send();
                getData();
            })

            minusButton.addEventListener("click", () => {
                if (numberInQuantity.value >= 1) {
                    numberInQuantity.value = (parseInt(numberInQuantity.value) - 1);
                    total.innerText = "£" + (parseFloat(total.innerText.substring(1)) - parseFloat(priceTd.innerText.substring(1)));

                    let add = new XMLHttpRequest();

                    add.open("DELETE", "http://localhost:8081/order/" + orderId + "/item/" + idTh.innerText);
                    add.setRequestHeader("Content-Type", "application/json");
                    add.send();
                    getData();
                }
            })

            addTd.appendChild(plusButton);
            addTd.appendChild(minusButton);

            tRow.appendChild(idTh);
            tRow.appendChild(imageTd);
            tRow.appendChild(nameTd);
            tRow.appendChild(priceTd);
            tRow.appendChild(quantityTd);
            tRow.appendChild(addTd);
            tBody.appendChild(tRow);
            getData();
        }
    }
    requestItems.send();

    let total = document.createElement("p");
    total.innerText = "£0.00";


    let createButton = document.createElement("button");
    createButton.setAttribute("class", "btn btn-info btn-create");
    createButton.innerText = "Create!";
    if (tBody.parentNode.parentNode.getElementsByClassName("btn-create")[0] == undefined) {
        tBody.parentNode.parentNode.appendChild(total);
        tBody.parentNode.parentNode.appendChild(createButton);
    }
    createButton.setAttribute("data-dismiss", "modal");
    createButton.addEventListener("click", () => {
        getData();
    })
}


let getData = () => {
    if (event) event.preventDefault();
    let request = new XMLHttpRequest();
    let orderList = document.getElementById("table-orders");
    request.open("GET", "http://localhost:8081/order/all");
    let tBody = orderList.getElementsByClassName("tbody-dark")[0];
    request.onload = () => {
        tBody.innerHTML = "";
        for (let order of JSON.parse(request.response)) {
            let tRow = document.createElement("tr");
            tRow.setAttribute("id", "order " + order["id"]);
            let newTh = document.createElement("th");
            newTh.setAttribute("scope", "row");
            newTh.innerText = order["id"];
            let priceTh = document.createElement("th");
            let price = 0.00;
            for (let item of order["items"]) {
                price += item["price"];
            }
            priceTh.innerText = "£"+price;
            let itemsTh = document.createElement("th");

            let itemView = document.createElement("button");
            itemView.innerText = "View";
            itemView.className = "btn btn-info";

            itemView.addEventListener("click", () => {
                let getRequest = new XMLHttpRequest();
                getRequest.open("GET", "http://localhost:8081/order/" + order["id"]);
                getRequest.onload = () => {
                    console.log(JSON.parse(getRequest.response));
                }
                getRequest.send();

            })
            itemsTh.appendChild(itemView);

            let functionalityTh = document.createElement("th");

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", () => {
                deleteData(order["id"]);
            })

            let updateForm = document.createElement("form");
            updateForm.setAttribute("onSubmit", "updateData(event)");
            let updateTextField = document.createElement("input");
            updateTextField.setAttribute("type", "hidden");
            updateTextField.setAttribute("name", "text");
            let updateSubmitButton = document.createElement("input");
            updateSubmitButton.value = "Submit update";
            updateSubmitButton.setAttribute("type", "hidden");
            let modalDiv = document.createElement("div");
            modalDiv.setAttribute("class", "modal fade");
            modalDiv.setAttribute("id", "modalDiv");
            let modalInnerDiv = document.createElement("div");
            modalInnerDiv.setAttribute("class", "modal-content");

            let modalBody = document.createElement("div");
            modalBody.setAttribute("class", "modal-body");

            let modalDialog = document.createElement("div");
            modalDialog.setAttribute("class", "modal-dialog");


            updateForm.appendChild(updateTextField);
            updateForm.appendChild(updateSubmitButton);
            modalDialog.appendChild(modalBody);
            modalBody.append(updateForm);
            modalInnerDiv.appendChild(modalDialog);
            modalDiv.appendChild(modalInnerDiv);
            let updateButton = document.createElement("button");
            updateButton.innerText = "Update";
            updateButton.className = "btn btn-info";
            updateButton.setAttribute("data-toggle", "modal");
            updateButton.setAttribute("data-target", "#modalDiv");
            updateButton.addEventListener("click", () => {
                updateTextField.setAttribute("type", "text");
                updateSubmitButton.setAttribute("type", "submit");
            })

            tBody.appendChild(tRow);
            functionalityTh.appendChild(deleteButton);
            functionalityTh.appendChild(updateButton);
            functionalityTh.appendChild(modalDiv);
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
    request.onload = () => {
        getData();
    }
    request.send();

}

getData();