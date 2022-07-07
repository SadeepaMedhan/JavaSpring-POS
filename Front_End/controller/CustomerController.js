
let updateStatus = false;
let saveStatus = false;

$('#btnSaveCustomer').click(function () {
    if(checkIfValid()){
        saveCus();
    }
});

function saveCus() {
    let serialize = $("#customerForm").serialize();
    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer",
        method: "POST",
        data: serialize,
        success: function (resp) {
            console.log(serialize);
            console.log(resp);
            loadAllCustomers();
            saveStatus = false;
        }
    });
}

$("#btnUpdateCus").click(function () {
    let customer = {
        id: $("#txtCusID").val(),
        name: $("#txtCusName").val(),
        address: $("#txtCusAddress").val(),
        contact: $("#txtCusTP").val()
    }
    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function (resp) {
            if (resp.status == 200) {
                //swal("Successful!", resp.message, "success");
                loadAllCustomers();
                $('#txtSearchCusID').val("")
                clearAll();
                updateStatus = false;
            } else {
                //swal("Unsuccessful!", resp.message, "error");
            }
        }
    });
});

function loadAllCustomers() {
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer?case=allCus",
        method: "GET",
        success: function (resp) {
            console.log(resp);
            for (const i of resp.data) {
                let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.contact}</td></tr>`;
                $("#customerTable").append(row);
            }
        }
    });
}

// search customer
$("#btnSearchCus").click(function () {
    var searchID = $("#txtSearchCusID").val();

    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer?case=getCustomer&id=" + searchID,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#cusDetailPopup").modal('show');
                console.log(res);

                $("#txtCusID").val(res.data.id);
                $("#txtCusName").val(res.data.name);
                $("#txtCusAddress").val(res.data.address);
                $("#txtCusTP").val(res.data.contact);
                updateStatus = true;
                saveStatus = false;
            } else {
                //swal("Unsuccessful!", res.message, "error");
            }
        }
    });
});

$("#btnCusDelete").click(function () {
    $.ajax({
        url: "http://localhost:8080/backendArtifact/customer?cusId=" + $("#txtCusID").val(),
        method: "DELETE",
        success: function (resp) {
            if (resp.status == 200) {
                //swal("Successful!", resp.message, "success");
                loadAllCustomers();
                $('#txtSearchCusID').val("")
                clearAll();
            } else {
                //swal("Unsuccessful!", resp.message, "error");
            }
        }
    });
});


//validation
//customer regular expressions
const regExCusID = /^C[0-9]{3,4}$/;
const regExCusName = /^[A-z]{5,25}$/;
const regExCusAddress = /^[0-9/A-z. ,]{5,}$/;
const regExCusTP = /^(071|077|078|075|076)[-]?[0-9]{7}$/;

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCusID").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCusID").val();
        // var srcCustomer = searchCustomer(typedCustomerID);
        // $("#txtCusID").val(srcCustomer.getCustomerID());
        // $("#txtCusName").val(srcCustomer.getCustomerName());
        // $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        // $("#txtCusTP").val(srcCustomer.getCustomerSalary());
    }
});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusTP").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnSaveCustomer").attr('disabled', true);
$("#btnUpdateCus").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnSaveCustomer").attr('disabled', true);
    $("#btnUpdateCus").attr('disabled', true);
    //loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcustp").text("");
}

function formValid() {
    var cusID = $("#txtCusID").val();
    $("#txtCusID").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (regExCusID.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (regExCusName.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtCusAddress").val();
            if (regExCusAddress.test(cusAddress)) {
                var cusTP = $("#txtCusTP").val();
                var resp = regExCusTP.test(cusTP);
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtCusTP").css('border', '2px solid green');
                    $("#lblcustp").text("");
                    return true;
                } else {
                    $("#txtCusTP").css('border', '2px solid red');
                    $("#lblcustp").text("Cus Telephone is a required field : Pattern 07********");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Address is a required field : Mimum 5");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Minimum 5, Max 25, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C001");
        return false;
    }
}

function checkIfValid() {

    var cusID = $("#txtCusID").val();
    if (regExCusID.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (regExCusName.test(cusName)) {
            $("#txtCusAddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (regExCusAddress.test(cusAddress)) {
                $("#txtCusTP").focus();
                var cusTp = $("#txtCusTP").val();
                var resp = regExCusTP.test(cusTp);
                if (resp) {
                    return true;
                } else {
                    $("#txtCusTP").focus();
                }
            } else {
                $("#txtCusAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusID").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        if (saveStatus){$("#btnSaveCustomer").attr('disabled', false);}
        if (updateStatus){$("#btnUpdateCus").attr('disabled', false);}
    } else {
        $("#btnSaveCustomer").attr('disabled', true);
        $("#btnUpdateCus").attr('disabled', true);
    }
}

