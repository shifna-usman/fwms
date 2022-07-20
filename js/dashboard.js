$(document).ready(function(){
    createFoodBankTable();
    createFoodRequestTable();

    $("#food-bank-add-button").click(function(){
        $("#food-bank-modal").modal("show");
    })

    $("#food-request-add-button").click(function(){
        $("#food-request-modal").modal("show");
    })
    
    $("#food-request-modal-close-button").click(function(){
        $("#food-request-modal").modal("hide");
    })

    $("#food-bank-cancel-button").click(function(){
        $("#food-bank-modal").modal("hide");
    })

    $("#food-item-cancel-button").click(function(){
        $("#food-bank-item-modal").modal("hide");
    })

    $("#food-bank-modal-add-item").click(function(){
        appendAddFoodItemRow();
    })

    $("#log-out-button").click(function(e){
        e.preventDefault();
        location.href = "./"
    })

    $("#food-bank-save-button").click(function(){
        name = $("#food-bank-modal-name").val();
        if(name == ""){
            alert("Plesae enter your name");
            return false;
        }

        phone = $("#food-bank-modal-phone").val();
        if(phone == ""){
            alert("Please enter your phone number");
            return false;
        }
        adPhone = $("#food-bank-modal-ad-phone").val();
        address = $("#food-bank-modal-address").val();
        landmark = $("#food-bank-modal-landmark").val();
        notes = $("#food-bank-modal-notes").val();
        foodItems = [];
        isFoodItemsOk = true;
        $(".food-bank-modal-item-row").each(function(index){
            itemName = $(this).find(".food-bank-modal-item-name").val();
            if(itemName == ""){
                alert(`Plesae enter food item name for row ${index + 1}`)
                isFoodItemsOk = false;
                return false;
            }
            itemQuantity = $(this).find(".food-bank-modal-item-quantity").val();
            if(itemQuantity == ""){
                alert(`Plesae enter food item quantity for row ${index + 1}`)
                isFoodItemsOk = false;
                return false;
            }
            quantityType = $(this).find(".food-bank-modal-item-quantity-type").val();
            if(!quantityType){
                alert(`Plesae choose food quantity type for row ${index + 1}`)
                isFoodItemsOk = false;
                return false;
            }
            foodItems.push({itemName : itemName, itemQuantity : itemQuantity, quantityType : quantityType});
        })
        if(!isFoodItemsOk) return false;
        if(foodItems.length == 0){
            alert("Please add atleast one food item");
            return false;
        }

        data = {name : name, phone : phone, adPhone : adPhone, address : address, landmark : landmark, notes : notes, foodItems : foodItems}
        sendAjax("./api/addFoodBankItem.php","POST",data,function(data){
            data = JSON.parse(data);
            console.log(data,data.result);
            if(data.result){
                $("#food-bank-modal").modal("hide");
                createFoodBankTable();
                clearFoodBankForm();
            }
            else{
                alert("Something went wrong. Please try again")
            }
        })

    })


    $("#food-request-modal-button").click(function(){
        console.log("button clicked")
        name = $("#food-request-modal-name").val();
        if(name == ""){
            alert("Plesae enter your name");
            return false;
        }

        phone = $("#food-request-modal-phone").val();
        if(phone == ""){
            alert("Please enter your phone number");
            return false;
        }
        adPhone = $("#food-request-modal-ad-phone").val();
        address = $("#food-request-modal-address").val();
        landmark = $("#food-request-modal-landmark").val();
        requirements = $("#food-request-modal-requirement").val();
        if(requirements == ""){
            alert("Please enter your food requirements");
            return false;
        }
        notes = $("#food-request-modal-notes").val();
        data = {name : name, phone : phone, adPhone : adPhone, address : address, landmark : landmark, notes : notes, requirements : requirements}
        sendAjax("./api/addFoodRequest.php","POST",data,function(data){
            data = JSON.parse(data);
            if(data.result){
                $("#food-request-modal").modal("hide");
                createFoodRequestTable();
                clearFoodRequestForm();
            }
            else{
                alert("Something went wrong. Please try again")
            }
        })
    })
});

$(document).on("click",".food-bank-modal-item-delete-row",function(){
    $(this).closest(".food-bank-modal-item-row").remove();
})

$(document).on("click",".view-food-details-button",function(){
    id = $(this).attr("id");
    $("#food-bank-item-table tbody").empty();
    sendAjax('./API/getFoodItemDetails.php',"GET",{id : id},function(data){
        data = JSON.parse(data);
        data.forEach(item => {
            element = `<tr>
                        <td>${item.name}</td>
                        <td>${item.quantity} ${item.unit}</td>
                    </tr>`
            $("#food-bank-item-table tbody").append(element);
        })
    })

    $("#food-bank-item-modal").modal("show")
})

function createFoodRequestTable(){
    sendAjax('./API/getFoodRequests.php',"GET",{},function(data){
        if(DataTable.isDataTable( '#food-request-table' ) ){
            $('#food-request-table').DataTable().destroy();
        }
        data = JSON.parse(data);
        $("#food-request-table tbody").empty();
        data.forEach(item => {
            element = `<tr>
                        <td>${item.name}</td>
                        <td>${item.created_at}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.additional_phone}</td>
                        <td>${item.address}</td>
                        <td>${item.landmark}</td>
                        <td>${item.requirement}</td>
                        <td>${item.notes}</td>
                    </tr>`
                    $("#food-request-table tbody").append(element);
        });

        
        setTimeout(() => {
            $('#food-request-table').DataTable();
        }, 100);
        
    })
}

function appendAddFoodItemRow(){
    const element = `<div class="row food-bank-modal-item-row">
                        <br>
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <input type="text" class="form-control food-bank-modal-item-name" placeholder="Food item name">
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control food-bank-modal-item-quantity" placeholder="Item quantity">
                        </div>
                        <div class="col-md-3">
                            <select class="form-control food-bank-modal-item-quantity-type">
                                <option selected disabled>Choose</option>
                                <option value="number">Number</option>
                                <option value="plate">Plate</option>
                            </select>
                        </div>
                        <div class="col-md-1"><span class="glyphicon glyphicon-trash food-bank-modal-item-delete-row"></span></div>
                    </div>`
    $("#food-bank-modal-item-container").append(element);
}

function createFoodBankTable(){
    sendAjax('./API/getFoodBankItems.php',"GET",{},function(data){
        if(DataTable.isDataTable( '#food-bank-table' ) ){
            $('#food-bank-table').DataTable().destroy();
        }
        data = JSON.parse(data);
        $("#food-bank-table tbody").empty();
        data.forEach(item => {
            element = `<tr>
                        <td>${item.name}</td>
                        <td>${item.created_at}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.additional_phone}</td>
                        <td>${item.address}</td>
                        <td>${item.landmark}</td>
                        <td>${item.notes}</td>
                        <td><button class="btn btn-primary view-food-details-button" id="${item.id}">View</button></td>
                    </tr>`
                    $("#food-bank-table tbody").append(element);
        });

        
        setTimeout(() => {
            $('#food-bank-table').DataTable();
        }, 100);
        
    })
}

function clearFoodBankForm(){
    $("#food-bank-modal-name").val("");
    $("#food-bank-modal-phone").val("");
    $("#food-bank-modal-ad-phone").val("");
    $("#food-bank-modal-address").val("");
    $("#food-bank-modal-landmark").val("");
    $("#food-bank-modal-notes").val("");
    $(".food-bank-modal-item-row").each(function(index){
        $(this).find(".food-bank-modal-item-name").val("");
        $(this).find(".food-bank-modal-item-quantity").val('');
        $(this).find(".food-bank-modal-item-quantity-type").val("select");
        if(index > 0){
            $(this).remove();
        }
    })
}

function clearFoodRequestForm(){
    $("#food-request-modal-name").val("");
    $("#food-request-modal-phone").val("");
    $("#food-request-modal-ad-phone").val("");
    $("#food-request-modal-address").val("");
    $("#food-request-modal-landmark").val("");
    $("#food-request-modal-requirement").val("");
    $("#food-bank-modal-notes").val("");
}