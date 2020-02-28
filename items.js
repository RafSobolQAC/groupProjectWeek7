let getData = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8081/note/");
    request.send();
    request.onload = () => {
        let data = JSON.parse(request.response);
        let list = document.getElementById("tasks");
        list.innerText = "";
        for(let task of data) {
            let listItem = document.createElement("li");
            let div = document.createElement("div");
            let para = document.createElement("p");
            para.innerText = task.text;
            let button = document.createElement("button");
            button.className = "btn btn-danger";
            button.innerText = "Delete"
            button.addEventListener("click", () => {
                deleteData(task.id);
            })
            div.appendChild(para);
            div.appendChild(button);
            listItem.appendChild(div);
            list.appendChild(listItem);
        }
    }
}

let itemOrder = () => {
    console.log("Test");
    let requestItems = new XMLHttpRequest();
    requestItems.open("GET", "http://localhost:8081/item/all");
    let modal = document.getElementById("create-modal");
    let tBody = document.getElementById("create-tbody");
    requestItems.onload = () => {
        for (let item of JSON.parse(requestItems.response)) {
            let tRow = document.createElement("tr");

            let idTh = document.createElement("th");
            idTh.setAttribute("scope","row");
            idTh.innerText = item["id"];
            let imageTd = document.createElement("td");
            let imageInTd = document.createElement("img");
            imageInTd.setAttribute("src",item["imageUrl"]);
            imageInTd.setAttribute("class","img-fluid img-thumbnail");
            imageInTd.setAttribute("alt",item["name"]);
            imageTd.appendChild(imageInTd);


            let nameTd = document.createElement("td");
            let priceTd = document.createElement("td");
            let quantityTd = document.createElement("td");
            let addTd = document.createElement("td");

            nameTd.innerText = item["name"];
            priceTd.innerText = "£"+item["price"];
            
            let numberInQuantity = document.createElement("input");
            numberInQuantity.setAttribute("type","number");
            numberInQuantity.setAttribute("id","quant");
            numberInQuantity.setAttribute("name","quantity");
            numberInQuantity.setAttribute("size",1);
            numberInQuantity.value=0;

            quantityTd.appendChild(numberInQuantity);
            
            let plusButton = document.createElement("button");
            let minusButton = document.createElement("button");

            plusButton.innerText = "+";
            minusButton.innerText = "-";
            plusButton.setAttribute("class","btn btn-info");
            minusButton.setAttribute("class","btn btn-danger");

            plusButton.addEventListener("click", () => {
                numberInQuantity.value = (parseInt(numberInQuantity.value)+1);
                total.innerText = "£"+(parseFloat(total.innerText.substring(1))+parseFloat(priceTd.innerText.substring(1)));
            })

            minusButton.addEventListener("click", () => {
                if (numberInQuantity.value >= 1) {
                    numberInQuantity.value = (parseInt(numberInQuantity.value)-1);
                    total.innerText = "£"+(parseFloat(total.innerText.substring(1))-parseFloat(priceTd.innerText.substring(1)));

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

    let requestPostItems = new XMLHttpRequest();
    requestPostItems.open("POST","http://localhost:8081/order");

    let createButton = document.createElement("button");
    createButton.setAttribute("class","btn btn-info");
    createButton.innerText = "Create!";
    tBody.parentNode.parentNode.appendChild(total);
    tBody.parentNode.parentNode.appendChild(createButton);

    createButton.addEventListener("click", () => {
        
    })
}