$(document).ready(function () {


    if (localStorage.getItem("Access_token") === null) {
        window.location.href = "/";
    }

    if (sessionStorage.getItem("Role") === "user") {
        $("#Devicedata").css("display", "none");
    }
    
    $("#DL").click((y)=> {
        y.preventDefault()
    })

    const menuIcon = document.getElementById("menu_icon");
    const sidebar = document.getElementById("DB");
    const icon = document.querySelector(".icon")
    const icon1 = document.querySelector(".icon1")
    var bHeading = document.getElementById('b_heading');
    var settingDiv = document.getElementById('setting');
    var container_tab  = document.getElementById("container");

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle("menuclose");
        if (sidebar.classList.contains("menuclose")) {
            container_tab.style.transition = "transform 0.3s ease"; //transition for smooth animation
            container_tab.style.transform = "translateX(-4%)";
        } else {
            container_tab.style.transform = "translateX(0)";
        }
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

});



$(document).ready(() => {

    // Fetch shipment data when the page is loaded
    fetchShipmentData();

    // Attach a click event handler to the element with ID "search"
    $("#search").on("click", () => {
        // Retrieve the value entered into the input field with ID "username_input"
        const username = $("#username_input").val().trim();

        // Check if the username is not empty
        if (username !== "") {

            // Fetch shipment data filtered by username
            fetch("/shipment_table", {
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("Access_token"),
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.detail);
                    });
                }
            })
            .then(shipmentList => {
                // Filter shipment list by username
                const user_find = shipmentList.filter(item => item.User_Firstname === username);
                
                // Check if any users are found with the entered username
                if (user_find.length > 0) {
                    // Construct HTML table rows for each found user
                    let userdata = "";
                    user_find.forEach(item => {
                        userdata += "<tr><td>" + item.User_Firstname + "</td><td>" + item.Shipment_Number + "</td><td>" + item.Container_Number + "</td><td>" +
                            item.Route_Details + "</td><td>" + item.Goods_Type + "</td><td>" + item.Device + "</td><td>" + item.Expected_Delivery_Date + "</td><td>" +
                            item.PO_Number + "</td><td>" + item.Delivery_Number + "</td><td>" + item.NDC_Number + "</td><td>" + item.Batch_id + "</td><td>" +
                            item.Serial_no_Goods + "</td><td>" + item.Comment + "</td></tr>";
                    });
                    // Update the HTML content of the element with ID "new_data" with the constructed user data
                    $("#new_data").html(userdata);
                } else {
                    // If no users are found, display a message or perform appropriate action
                    $("#error").text("No users found with the entered username.");
                }
            })
            .catch(error => {
                $("#error").text(error.message);
                setTimeout(() => {
                    $("#error").text("");
                }, 2000);
            });

        } else {
            // If the username is empty, display a message or perform appropriate action
            $("#error").text("Please enter a username.");
        }
    });

});

// Function to fetch shipment data
function fetchShipmentData() {
    fetch("/shipment_table", {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("Access_token"),
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.detail);
            });
        }
    })
    .then(shipmentList => {
        // Construct HTML table rows for each shipment
        let shipmentData = "";
        shipmentList.forEach(item => {
            shipmentData += "<tr><td>" + item.User_Firstname + "</td><td>" + item.Shipment_Number + "</td><td>" + item.Container_Number + "</td><td>" +
                item.Route_Details + "</td><td>" + item.Goods_Type + "</td><td>" + item.Device + "</td><td>" + item.Expected_Delivery_Date + "</td><td>" +
                item.PO_Number + "</td><td>" + item.Delivery_Number + "</td><td>" + item.NDC_Number + "</td><td>" + item.Batch_id + "</td><td>" +
                item.Serial_no_Goods + "</td><td>" + item.Comment + "</td></tr>";
        });
        // Update the HTML content of the element with ID "new_data" with the constructed shipment data
        $("#new_data").html(shipmentData);
       
    })
    // Display the table if it was initially hidden
   
    .catch(error => {
        $("#error").text(error.message);
        setTimeout(() => {
            $("#error").text("");
        }, 2000);
    });
};


//logout 
function logout() {

    localStorage.removeItem("Access_token");
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
   
}