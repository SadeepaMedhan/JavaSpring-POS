$('#btnSaveItem').click(function () {
    if(checkIfValidItem()){
        saveItem();
    }
});

function saveItem() {
    let item = {
        id: $("#txtItemCode").val(),
        name: $("#txtItemName").val(),
        qty: $("#txtItemQty").val(),
        price: $("#txtItemPrice").val()
    }
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (resp) {
            if (resp.status == 200) {
                //swal("Successful!", resp.message, "success");
                loadAllItems();
            } else {
                //swal("Unsuccessful!", resp.message, "error");
            }
        }
    });
}

$('#btnUpdateItem').click(function () {
    let item = {
        id: $("#txtItemCode").val(),
        name: $("#txtItemName").val(),
        qty: $("#txtItemQty").val(),
        price: $("#txtItemPrice").val()
    }
    console.log(item);
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (resp) {
            if (resp.status == 200) {

                console.log(resp);
                //swal("Successful!", resp.message, "success");
                loadAllItems();
            } else {
                //swal("Unsuccessful!", resp.message, "error");
            }
        }
    });
});

function loadAllItems() {
    $("#itemTable").empty();
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item?case=allItems",
        method: "GET",
        success: function (resp) {
            let x = 1;
            for (const i of resp.data) {
                let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.qty}</td><td>${i.price}</td></tr>`;
                $("#itemTable").append(row);
            }
        }
    });
}

$("#btnSearchItem").click(function () {

    var searchID = $("#txtSearchItem").val();
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item?case=getItem&id=" + searchID,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#addNewItemModal").modal('show');
                    console.log(res);

                    $("#txtItemCode").val(res.data.id);
                    $("#txtItemName").val(res.data.name);
                    $("#txtItemQty").val(res.data.qty);
                    $("#txtItemPrice").val(res.data.price);
            } else {
                //swal("Unsuccessful!", res.message, "error");
            }
        }
    });
});

$("#btnItemDelete").click(function () {
    var searchID = $("#txtSearchItem").val();
    $.ajax({
        url: "http://localhost:8080/backendArtifact/item?id=" + searchID,
        method: "DELETE",
        success: function (resp) {
            if (resp.status == 200) {
                //swal("Successful!", resp.message, "success");
                loadAllItems();
            } else {
                //swal("Unsuccessful!", resp.message, "error");
            }
        }
    });
});


//validation
//item regular expressions
const regExItemCode = /^I[0-9]{3,4}$/;
const regExItemName = /^[A-z]{3,15}$/;
const regExItemQty = /^[0-9]{1,4}$/;
const regExItemPrice = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('blur', function () {
    formValidItem();
});

//focusing events
$("#txtItemCode").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtItemQty").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtItemPrice").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});
// focusing events end
$("#btnSaveItem").attr('disabled', true);

function clearAllItem() {
    $('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').val("");
    $('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').css('border', '2px solid #ced4da');
    $('#txtItemCode').focus();
    $("#btnSaveItem").attr('disabled', true);
    loadAllItems();
    $("#lblitemcode,#lblitemname,#lblitemqty,#lblitemprice").text("");
}

function formValidItem() {
    var itemCode = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '2px solid green');
    $("#lblitemcode").text("");
    if (regExItemCode.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (regExItemName.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblitemname").text("");
            var itemQty = $("#txtItemQty").val();
            if (regExItemQty.test(itemQty)) {
                var itemPrice = $("#txtItemPrice").val();
                var resp = regExItemPrice.test(itemPrice);
                $("#txtItemQty").css('border', '2px solid green');
                $("#lblitemqty").text("");
                if (resp) {
                    $("#txtItemPrice").css('border', '2px solid green');
                    $("#lblitemprice").text("");
                    return true;
                } else {
                    $("#txtItemPrice").css('border', '2px solid red');
                    $("#lblitemprice").text("Item Price is a required field : Pattern 100.00");
                    return false;
                }
            } else {
                $("#txtItemQty").css('border', '2px solid red');
                $("#lblitemqty").text("Item Qty is a required field : Used Numbers Only");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblitemname").text("Cus Name is a required field : Minimum 3, Max 15, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblitemcode").text("Item Code is a required field : Pattern I001");
        return false;
    }
}

function checkIfValidItem() {
    var itemCode = $("#txtItemCode").val();
    if (regExItemCode.test(itemCode)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (regExItemName.test(itemName)) {
            $("#txtItemQty").focus();
            var itemQty = $("#txtItemQty").val();
            if (regExItemQty.test(itemQty)) {
                $("#txtItemPrice").focus();
                var itemPrice = $("#txtItemPrice").val();
                var resp = regExItemPrice.test(itemPrice);
                if (resp) {
                    return true;
                    /*let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                       return true;
                    }*/
                } else {
                    $("#txtItemPrice").focus();
                }
            } else {
                $("#txtItemQty").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemCode").focus();
    }
}

function setItemButton() {
    let b = formValidItem();
    if (b) {
        $("#btnSaveItem").attr('disabled', false);
    } else {
        $("#btnSaveItem").attr('disabled', true);
    }
}

