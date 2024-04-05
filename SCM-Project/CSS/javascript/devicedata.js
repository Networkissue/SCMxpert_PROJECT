if (localStorage.getItem("Access_token") === null) {
    window.location.href = "/"
}
if (sessionStorage.getItem("Role") === "user") {
    $("#Devicedata").css("display", "none")
}

$(document).ready(function () {
    
    document.getElementById("dashboard_icon").addEventListener("click", (e) => {
        e.preventDefault();
    })
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

});


$(document).ready(() => {

    $("#submitButton").click(function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get the value of the selected option
        var selectedOption = $("#selectOption").val();
    
        // Check if the selected option is "#selecthere"
        if (selectedOption === "#selecthere") {
            // Display error message
            $("#error").text("Please select an ID");
    
            // Clear the error message after 2 seconds
            setTimeout(() => {
                $("#error").text("");
            }, 2000); }
        
    })
    $("#submit").on("click", (e) => {
        e.preventDefault();
        const dev = $("#search").val();
        const form = new FormData();
        form.append("device_id", dev);
        fetch("/devicedata", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("Access_token"),
            },
            body: form,
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then(data => {
                    throw new Error(data.message)
                })
            }
        // }).then(response => {
        //     if ($("#selecthere").is(":selected")){
        //             $("#error").text("Please select an ID");
        //             setTimeout(() => {
        //                 $("#error").text("");
        //             }, 2000)
        //     }
    }) .then(response => {
            let device_data = "";

             // It iterates over an elements and call backs to the function for each elements
            response.device.forEach(device_details => {
                device_data += "<tr><td>" +
                    device_details.Device_Id + "</td><td>" +
                    device_details.Battery_level + "</td><td>" +
                    device_details.First_Sensor_Temperature + "</td><td>" +
                    device_details.Route_From + "</td><td>" +
                    device_details.Route_To + "</td><td>" +
                    device_details.Time_Stamp + "</td></tr>";
            });
            $("#get_data").html(device_data);
        }).catch(error => {
            $("#error").text(error.message)
            setTimeout(()=> {
                $("#error").text(' ')
            }, 2000)
        });

    });
});

//logout 
$(document).ready(()=>{
    $("#logout").on("click",(e)=>{
        e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/"
    })
})
