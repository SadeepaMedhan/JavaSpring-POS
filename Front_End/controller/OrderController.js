
let cartList = [];


function loadCusIds() {
    var select = document.getElementById("inputCustomer");
    loadCusDetails(select.options[select.selectedIndex].value);
}

function loadAllCusID() {
    $("#inputCustomer").empty();
    $("#inputCustomer").append(`<option value="" disabled selected hidden>Select ID</option>`);
    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer?case=allID",
        method: "GET",
        success: function (resp) {
            for (let id of resp.data) {
                let cusID = `<option value="${id.id}">${id.id}</option>`;
                $("#inputCustomer").append(cusID);
            }
        }
    });
}

function loadCusDetails(id) {
    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer?case=getCustomer&id=" + id,
        method: "GET",
        success: function (resp) {
            $("#txtOrderCusID").val(resp.data.id);
            $("#txtOrderCusName").val(resp.data.name);
            $("#txtOrderCusAddress").val(resp.data.address);
            $("#txtOrderCusTP").val(resp.data.contact);
        }
    });
}

//----item---
function loadItemCodes() {
    var select = document.getElementById("inputItem");
    loadItemDetails(select.options[select.selectedIndex].value);
    $("#txtOrderItemCode").css('border', '2px solid #ced4da');
}

function loadAllItemID() {
    $("#inputItem").empty();
    $("#inputItem").append(`<option value="" disabled selected hidden>Select ID</option>`);
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item?case=allID",
        method: "GET",
        success: function (resp) {
            for (let id of resp.data) {
                let itemID = `<option value="${id.id}">${id.id}</option>`;
                $("#inputItem").append(itemID);
            }
        }
    });
}

function loadItemDetails(id) {
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item?case=getItem&id=" + id,
        method: "GET",
        success: function (res) {
            $("#txtOrderItemCode").val(res.data.id);
            $("#txtOrderItemName").val(res.data.name);
            $("#txtOrderQtyOnHand").val(res.data.qty);
            $("#txtOrderItemPrice").val(res.data.price);
        }
    });
}



$("#btnAddToCart").click(function () {
    var itemCode = $("#txtOrderItemCode").val();
    var itemName = $("#txtOrderItemName").val();
    var itemPrice = $("#txtOrderItemPrice").val();
    var itemQty = $("#txtOrderQtyOnHand").val();
    var orderQty = $("#txtOrderQty").val();

    if (regExItemCode.test(itemCode)) {
        $("#txtOrderItemCode").css('border', '2px solid #ced4da');
        if (regExItemQty.test(orderQty)) {

            let itemTotal = itemPrice * orderQty;
            let newItemToCart = new CartItem(itemCode, itemName, itemQty, itemPrice, orderQty, itemTotal);
            cartList.push(newItemToCart);
            loadCartAll();

            $("#txtOrderQty").css('border', '2px solid #ced4da');
            clearOrderItem();
        } else {
            $("#txtOrderQty").css('border', '2px solid red');
        }
    } else {
        $("#txtOrderItemCode").css('border', '2px solid red');
    }
});

function removeCartItem(code) {
    for (let i of cartList) {
        if (i.getItemId() === code) {
            cartList.splice(i, 1);
        }
    }
}


function loadCartAll() {

    $("#tableCart").empty();
    for (let item of cartList) {

        $("#btnRemove").click(function () {
            let res = confirm("Do you need to Remove this Item..?");
            if (res) {
                removeCartItem(item.getItemId());
                loadCartAll();
            }
        });
        let row = `<tr>
                    <td>${item.getItemId()}</td>
                    <td>${item.getItemName()}</td>
                    <td>${item.getItemPrice()}</td>
                    <td>${item.getQtyForSale()}</td>
                    <td>${item.getTotPrice()}</td>
                    <td><button id="btnRemove" type="button" className="btn-sm">X</button></td>
                    </tr>`;

        $("#tableCart").append(row);
    }
    calculate();
}

function clearOrderItem() {
    $('#txtOrderItemCode,#txtOrderItemName,#txtOrderItemPrice,#txtOrderQtyOnHand,#txtOrderQty').val("");
    loadAllItemID();
}

function calculate() {
    $("#lblTotalPrice").text("Total : " + getTotal() + ".00 Rs/=");
    $("#lblSubTotal").text("SubTotal : " + getTotal() + ".00 Rs/=");
}


$("#btnPurchase").click(function () {
    var discount = 0;
    let items = [];

    for (var i of cartList) {
        let item = {
            id: i.getItemId(),
            qyt: i.getQtyForSale(),
            price:i.getItemPrice(),
            cost: i.getTotPrice()
        }
        items.push(item);
    }
    let order = {
        cusId: $("#txtOrderCusID").val(),
        items: items,
        totalCost: getTotal(),
        discount:discount
    }

    $.ajax({
        url: "http://localhost:8080/backendArtifact/order",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(order),
        success: function () {

        }
    });

    clearAllOrder();
});

function getTotal() {
    let total = 0;
    for (let i of cartList) {
        total += i.getTotPrice();
    }
    return total;
}

function clearAllOrder() {
    $("#tableCart").empty();
    cartList.splice(0, cartList.length);
    calculate();
    //getOrderID();
}

function loadAllOrders() {
    $("#tableOrderList").empty();
    // for (var i of orderDB) {
    //     let itemQty = i.getCart().length;
    //     let row = `<tr><td>${i.getOrderId()}</td><td>${i.getCustomerId()}</td><td>${itemQty}</td><td>${i.getDate()}</td><td>${i.getTotal()}</td></tr>`;
    //     $("#tableOrderList").append(row);
    // }
}


