$(document).ready(function() {


    if (localStorage.getItem("Access_token") === null) {
        window.location.href = "/";
    }

    if (sessionStorage.getItem("Role") === "user") {
        $("#Devicedata").css("display", "none");
        $("#user_input").css("display", "none");
        $("#search").css("display", "none");
        $("#table_username").css("display", "none");

    }

    //dashboard icon should be prevented
    $("#DL").click((y) => {
        y.preventDefault()
    })

    const menuIcon = document.getElementById("menu_icon");
    const sidebar = document.getElementById("DB");
    const icon = document.querySelector(".icon")
    const icon1 = document.querySelector(".icon1")
    var bHeading = document.getElementById('b_heading');
    var settingDiv = document.getElementById('setting');
    var container_tab = document.getElementById("container");

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
    bHeading.addEventListener('click', function () {
        // Toggle the display property of the setting div
        if (settingDiv.style.display === 'none') {
            settingDiv.style.display = 'block';
        } else {
            settingDiv.style.display = 'none';
        }
    });

});

//////////////////////////////////// table //////////////////////////////

$(document).ready(() => {

    // Fetch shipment data when the page is loaded
    fetchShipmentData();

    // Attach a click event handler to the element with ID "search"
    $("#search").on("click", () => {
        // Retrieve the value entered into the input field with ID "username_input"
        const username = $("#user_input").val().trim();
        if (username !== "") {


            // Check if the username is not empty

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
                            throw new Error(data.message);
                        });
                    }
                })
                .then(shipment_list => {
                    // Filter shipment list by username // Array.prototype.filter() and creates a new array with elements to the provided function
                    const user_find = shipment_list.filter(item => item.Username === username || item.Shipment_Number === parseInt(username));
                    if (user_find !== "") {
                        // Check if any users are found with the entered username
                        if (user_find.length > 0) {
                            // Construct HTML table rows for each found user
                            let userdata = "";

                            // it iterate over an elements and callback function for each element 
                            user_find.forEach(item => {
                                userdata += "<tr><td>" + item.Username + "</td><td>" + item.Shipment_Number + "</td><td>" + item.Container_Number + "</td><td>" +
                                    item.Route_Details + "</td><td>" + item.Goods_Type + "</td><td>" + item.Device + "</td><td>" + item.Expected_Delivery_Date + "</td><td>" +
                                    item.PO_Number + "</td><td>" + item.Delivery_Number + "</td><td>" + item.NDC_Number + "</td><td>" + item.Batch_id + "</td><td>" +
                                    item.Serial_no_Goods + "</td><td>" + item.Comment + "</td></tr>";
                            });
                            // Update the HTML content of the element with ID "new_data" with the constructed user data
                            $("#new_data").html(userdata);
                        } else {
                            // If no users are found, display a message or perform appropriate action
                            $("#error").text("No users found with the entered username.");
                            setTimeout(() => {
                                $("#error").text("")
                            }, 2000);
                        }
                    } else {
                        $("#error").text("Token Expired, Relogin...")
                    }
                
                })
                .catch(error => {
                    $("#error").text(error);
                    
                    setTimeout(() => {
                        $("#error").text("");
                    }, 2000);
                });

        } else {
            // If the username is empty, display a message or perform appropriate action
            $("#error").text("Please enter a username.");
            setTimeout(() => {
                $("#error").text("");
            }, 2000);
        };
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
        .then(shipment_list => {
            let shipmentData = "";
            // Construct HTML table rows for each shipment
            if (sessionStorage.getItem("Role") === "admin") {
      
             shipment_list.forEach(item => {
                shipmentData += "<tr><td>" + item.Username + "</td><td>" + item.Shipment_Number + "</td><td>" + item.Container_Number + "</td><td>" +
                    item.Route_Details + "</td><td>" + item.Goods_Type + "</td><td>" + item.Device + "</td><td>" + item.Expected_Delivery_Date + "</td><td>" +
                    item.PO_Number + "</td><td>" + item.Delivery_Number + "</td><td>" + item.NDC_Number + "</td><td>" + item.Batch_id + "</td><td>" +
                    item.Serial_no_Goods + "</td><td>" + item.Comment + "</td></tr>";
            });
            // Update the HTML content of the element with ID "new_data" with the constructed shipment data
            }
            else{
                
                shipment_list.forEach(item => {
                    shipmentData += "</td><td>" + item.Shipment_Number + "</td><td>" + item.Container_Number + "</td><td>" +
                        item.Route_Details + "</td><td>" + item.Goods_Type + "</td><td>" + item.Device + "</td><td>" + item.Expected_Delivery_Date + "</td><td>" +
                        item.PO_Number + "</td><td>" + item.Delivery_Number + "</td><td>" + item.NDC_Number + "</td><td>" + item.Batch_id + "</td><td>" +
                        item.Serial_no_Goods + "</td><td>" + item.Comment + "</td></tr>";
                });
            } 
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
$(document).ready(() => {
    $("#logout").on("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/"
    })
})
