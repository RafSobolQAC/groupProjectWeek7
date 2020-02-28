let createOrder = () => {


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
            })

            minusButton.addEventListener("click", () => {
                if (numberInQuantity.value >= 1) {
                    numberInQuantity.value = (parseInt(numberInQuantity.value) - 1);
                    total.innerText = "£" + (parseFloat(total.innerText.substring(1)) - parseFloat(priceTd.innerText.substring(1)));

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
        }
    }
    requestItems.send();

    let total = document.createElement("p");
    total.innerText = "£0.00";


    let createButton = document.createElement("button");
    createButton.setAttribute("class", "btn btn-info");
    createButton.innerText = "Create!";
    tBody.parentNode.parentNode.appendChild(total);
    tBody.parentNode.parentNode.appendChild(createButton);

    createButton.addEventListener("click", () => {
        let requestPostItems = new XMLHttpRequest();
        requestPostItems.open("POST", "http://localhost:8081/order");
        let order = {};
        order["id"] = 1;
        let items = [];
        for (let i = 0, row; row = tBody.rows[i]; i++) {
            let quant = row.cells[4].getElementsByClassName("quant")[0].value;
            if (quant >= 1) {
                for (let j = 0; j < quant; j++) {
                    // items["id"] = row.cells[0].innerText;
                    let innerItems = {};
                    innerItems["id"] = row.cells[0].innerText;
                    innerItems["imageUrl"] = row.cells[1].getElementsByClassName("img-fluid")[0].imageUrl;
                    innerItems["itemName"] = row.cells[2].innerText;
                    innerItems["price"] = parseFloat(row.cells[3].innerText.substring(1));
                    items.push(innerItems);
                }

                // for (let j = 0; j < row.cells[4].; 
            }
        }
        order["items"] = items;
        order["purchased"] = true;
        requestPostItems.setRequestHeader("Content-Type", "application/json");
        requestPostItems.onload = getData();
        requestPostItems.send(JSON.stringify(order));
    })
}


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

            let itemView = document.createElement("button");
            itemView.innerText = "View";
            itemView.className = "btn btn-info";
            itemView.addEventListener("click", () => {
                viewItems(order["id"]);
            })


            let functionalityTh = document.createElement("th");

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", () => {
                deleteData(order["id"]);
                getData();
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
    request.send();
}

getData();