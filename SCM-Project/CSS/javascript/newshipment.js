$(document).ready(function () {


    if (localStorage.getItem("Access_token") === null) {
        window.location.href = "/";
    }

    if (sessionStorage.getItem("Role") === "user") {
        $("#Devicedata").css("display", "none");
    }

    const menuIcon = document.getElementById("menu_icon");
    const sidebar = document.getElementById("DB");
    const icon = document.querySelector(".icon")
    const icon1 = document.querySelector(".icon1")
    var bHeading = document.getElementById('b_heading');
    var settingDiv = document.getElementById('setting');

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle("menuclose");
    });
    icon.addEventListener('click', () => {
        sidebar.classList.remove("menuclose");
    });
    icon1.addEventListener('click', () => {
        sidebar.classList.remove("menuclose");
    });
    bHeading.addEventListener('click', function () {
        // Toggle the display property of the setting div
        if (settingDiv.style.display === 'none') {
            settingDiv.style.display = 'block';
        } else {
            settingDiv.style.display = 'none';
        }

        // dashboard icon should be prevented 
        document.getElementById("dashboard_icon").addEventListener("click", (e) => {
            e.preventDefault();
        })
    });

});

///////////////////////////////////table content ////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('Expected_Delivery_Date').min = today;

    // Handle form submission for creating a new shipment
    document.getElementById("button1").addEventListener("click", (e) => {
        e.preventDefault();
        const ship_num = $("#Shipment_Number").val();
        const RD = $("#Route_Details").val();
        const D = $("#Device").val();
        const PO = $("#PO_Number").val();
        const NDC = $("#NDC_Number").val();
        const Serial = $("#Serial_no_Goods").val();
        const CN = $("#Container_Number").val();
        const GT = $("#Goods_Type").val();
        const EDD = $("#Expected_Delivery_Date").val();
        const DN = $("#Delivery_Number").val();
        const Bid = $("#Batch_id").val();
        const Comment = $("#Comment").val();

        if (ship_num !== "" && RD !== "" & D !== "" && PO !== "" && NDC !== "" && Serial !== "" && CN !== "" && GT !== "" && EDD !== "" && DN !== "" && Bid !== "" && Comment !== "") {
            if (ship_num.length === 7 ){
                fetch("/Newshipment", {
                    method: "POST",
                    headers: {
                        "Authorization": `${localStorage.getItem("Access_token")}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "Shipment_Number": $("#Shipment_Number").val(),
                        "Route_Details": $("#Route_Details").val(),
                        "Device": $("#Device").val(),
                        "PO_Number": $("#PO_Number").val(),
                        "NDC_Number": $("#NDC_Number").val(),
                        "Serial_no_Goods": $("#Serial_no_Goods").val(),
                        "Container_Number": $("#Container_Number").val(),
                        "Goods_Type": $("#Goods_Type").val(),
                        "Expected_Delivery_Date": $("#Expected_Delivery_Date").val(),
                        "Delivery_Number": $("#Delivery_Number").val(),
                        "Batch_id": $("#Batch_id").val(),
                        "Comment": $("#Comment").val()
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to create shipment. Please try again later.');
                    }
                })
                .then(data => {
                    $("#message").text("Shipment Created Successfully").css("color", "green");
                    setTimeout(() => {
                        $("#message").text("");
                        window.location.href = "/Newshipment";
                    }, 2000);
                   
                })
                .catch(error => {
                    $("#message").text(error.message);
                    setTimeout(() => {
                        $("#message").text("");
                    }, 2000);
                });
            } else {
                $("#message").text("Shipment number must be 7 characters long.");
                setTimeout(() => {
                    $("#message").text("");
                }, 2000);
            }
        } else {
            $("#message").text("Please fill out all fields.");
            setTimeout(() => {
                $("#message").text("");
            }, 2000);
        }
    });
});
        


//logout 
$(document).ready(() => {
    $("#logout").on("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/"
    })
})
