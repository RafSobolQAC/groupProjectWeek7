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

            let updateForm = document.createElement("form");
            updateForm.setAttribute("onSubmit", "updateData(event)");
            let updateTextField = document.createElement("input");
            updateTextField.setAttribute("type", "hidden");
            updateTextField.setAttribute("name", "text");
            let updateSubmitButton = document.createElement("input");
            updateSubmitButton.value = "Submit update";
            updateSubmitButton.setAttribute("type", "hidden");
            let modalDiv = document.createElement("div");
            modalDiv.setAttribute("class","modal fade");
            modalDiv.setAttribute("id","modalDiv");
            let modalInnerDiv = document.createElement("div");
            modalInnerDiv.setAttribute("class","modal-content");
            
            let modalBody = document.createElement("div");
            modalBody.setAttribute("class","modal-body");

            let modalDialog = document.createElement("div");
            modalDialog.setAttribute("class","modal-dialog");


            updateForm.appendChild(updateTextField);
            updateForm.appendChild(updateSubmitButton);
            modalDialog.appendChild(modalBody);
            modalBody.append(updateForm);
            modalInnerDiv.appendChild(modalDialog);
            modalDiv.appendChild(modalInnerDiv);
            let updateButton = document.createElement("button");
            updateButton.innerText = "Update";
            updateButton.className = "btn btn-info";
            updateButton.setAttribute("data-toggle","modal");
            updateButton.setAttribute("data-target","#modalDiv");
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