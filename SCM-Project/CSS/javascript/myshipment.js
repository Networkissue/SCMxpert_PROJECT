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


let currentPage = 1;
const rowsPerPage = 8;

// Event listener for pagination controls
document.addEventListener("DOMContentLoaded", function () {
    fetchShipmentData(); // Load data on page load
    updateTableDisplay();
    
    if (currentPage === 1) {
        updateActivePage();
    }
    document.getElementById("prevPage").addEventListener("click", () => {
       
        if (currentPage > 1) {
            currentPage--;
            fetchShipmentData();
            updateActivePage();
            updateTableDisplay();
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
    
            currentPage++;
            fetchShipmentData();
            updateTableDisplay();
            updateActivePage();
    });

    // Add click events to each list item in pagination control
    document.getElementById("pageNumbers").addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            // Update the current page based on the clicked list item
            currentPage = parseInt(event.target.getAttribute("value"));
    
            // Get all list items in the pagination
            const allListItems = document.querySelectorAll(".pagination-controls li");
    
            // Remove the 'active' class from all list items
            allListItems.forEach((item) => {
                item.classList.remove("active");
            });
    
            // Add the 'active' class to the clicked list item
            event.target.classList.add("active");
            fetchShipmentData();
            updateActivePage();

            // Update the table display based on the new current page
            updateTableDisplay();
        }
        
        // Example:error message after 2 seconds
        setTimeout(() => {
            document.getElementById("error").innerText = "";
        }, 2000); // here we can change
});

function updateActivePage() {
    // Remove active class from all <li> elements
    document.querySelectorAll("#pageNumbers li").forEach((li) => {
        li.classList.remove("active");
    });

    // Add active class to the current page
    const currentPageElement = document.querySelector(`#pageNumbers li[value='${currentPage}']`);
    if (currentPageElement) {
        currentPageElement.classList.add("active");
    }
}
});

function updateTableDisplay() {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = startRow + rowsPerPage;
// Attach a click event handler to the element with ID "search"
    $("#search").on("click", () => {
        // Retrieve the value entered into the input field with ID "username_input"
        const username = $("#user_input").val().trim();
        if (username !== "") {
        fetch("/shipment_table", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("Access_token"),
            },
        })
            .then((response) => response.json())
            .then((shipmentList) => {
                const pageRows = shipmentList.slice(startRow, endRow);
                    //  Filter shipment list by username // Array.prototype.filter() and creates a new array with elements to the provided function
                        const user_find = pageRows.filter(item => item.Username === username || item.Shipment_Number === parseInt(username));
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
                            } 
                        } else {
                            $("#error").text("No users found with the entered username.")
                        }
                    
            })  .catch(error => {
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
};


function fetchShipmentData() {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    fetch("/shipment_table", {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("Access_token"),
        },
    })
        .then((response) => response.json())
        .then((shipmentList) => {
            
            const pageRows = shipmentList.slice(startRow, endRow);
            let shipmentData = "";
                        // Construct HTML table rows for each shipment
                        if (sessionStorage.getItem("Role") === "admin") {
                            pageRows.forEach(item => {
                            shipmentData += "<tr><td>" + item.Username + "</td><td>" + item.Shipment_Number + "</td><td>" + item.Container_Number + "</td><td>" +
                                item.Route_Details + "</td><td>" + item.Goods_Type + "</td><td>" + item.Device + "</td><td>" + item.Expected_Delivery_Date + "</td><td>" +
                                item.PO_Number + "</td><td>" + item.Delivery_Number + "</td><td>" + item.NDC_Number + "</td><td>" + item.Batch_id + "</td><td>" +
                                item.Serial_no_Goods + "</td><td>" + item.Comment + "</td></tr>";
                        });
                        // Update the HTML content of the element with ID "new_data" with the constructed shipment data
                        }
                        else{
                            
                            pageRows.forEach(item => {
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
