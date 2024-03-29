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
    bHeading.addEventListener('click', function() {
        // Toggle the display property of the setting div
        if (settingDiv.style.display === 'none') {
            settingDiv.style.display = 'block';
        } else {
            settingDiv.style.display = 'none';
        }
});


     

    // sidebarLinks.forEach(function (link) {
    //     link.addEventListener('click', function (event) {
    //         // event.preventDefault();
    //         // Remove active class from all links
    //         sidebarLinks.forEach(function (sidebarLink) {
    //             sidebarLink.classList.remove('active');
    //         });

    //         const isActive = link.classList.contains('active');
    //         // Add active class to clicked link
    //         const parent = link.parentElement;
    //         let option = document.querySelector('.option');
    //         let setting = document.querySelector('.setting');
    //         if (!isActive) {
    //             link.classList.add('active');
    //             if (parent.classList.contains("A")) {
    //                 option.style.display = 'block';
    //                 setting.style.display = 'none';
    //             } else {
    //                 setting.style.display = 'block';
    //                 option.style.display = 'none';
    //             }
    //         } else {
    //             setting.style.display = 'none';
    //             option.style.display = 'block';
    //         }
    //     });

    // });

});

///////////////////////////////////table content ////////////////////////////

$(document).ready(() => {
    // Initialize Expected_Delivery_Date input field with the current date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = String(today.getFullYear());

    today = dd + "/" + mm + "/" + yyyy;
    document.getElementById("Expected_Delivery_Date").min = today;
    document.getElementById("dashboard_icon").addEventListener("click", (e) => {
        e.preventDefault();
    })
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
                        return response.json().then(error => {
                            $("#message").text(error.error);
                        })
                    }
                }).then(response => {
                    alert("Shipment Created Successfully");
                    window.location.href = "/Newshipment";
                })
        } else {
            $("#message").text("Please Enter all Fields");
        }
    })

}).catch(error => {
    $("#message").text(error.message);
});


// Logout function
function logout() {
    localStorage.removeItem("Access_token");
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
    window.location.href = "/";
}
