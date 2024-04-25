if (localStorage.getItem("Access_token") === null) {
    window.location.href = "/"
}
if (sessionStorage.getItem("Role") === "user") {
    $("#Devicedata").css("display", "none")
}

$(document).ready( () => {
    
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
 
//////////////////////////////////// table /////////////////////////////////


document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const rowsPerPage = 12;

    function updateActivePage() {
        document.querySelectorAll("#pageNumbers li").forEach((li) => {
            li.classList.remove("active");
        });

        const currentPageElement = document.querySelector(`#pageNumbers li[value='${currentPage}']`);
        if (currentPageElement) {
            currentPageElement.classList.add("active");
        }
    }

    function updateTableDisplay() {
        const startRow = (currentPage - 1) * rowsPerPage;
        const endRow = startRow + rowsPerPage;

        const selectedDevice = document.getElementById("search").value;

        if (!selectedDevice || selectedDevice === "Select Here") {
            document.getElementById("error").textContent = "Please select a device ID.";
            setTimeout(() => {
                document.getElementById("error").textContent = "";
            }, 2000);
            return;
        }

        const url = "/devicedata1?device_id=" + selectedDevice; // Using concatenation
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("Access_token"),
            },
        })
        
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.message);
                });
            }
            return response.json();
        })
        .then((data) => {
            const pageRows = data.device.slice(startRow, endRow);
            let deviceData = "";

            pageRows.forEach((device_details) => {
                deviceData += `<tr>
                    <td>${device_details.Device_Id}</td>
                    <td>${device_details.Battery_level}</td>
                    <td>${device_details.First_Sensor_Temperature}</td>
                    <td>${device_details.Route_From}</td>
                    <td>${device_details.Route_To}</td>
                    <td>${device_details.Time_Stamp}</td>
                </tr>`;
            });

            document.getElementById("get_data").innerHTML = deviceData;
        }).catch((error) => {
            document.getElementById("error").textContent = error.message;
            setTimeout(() => {
                document.getElementById("error").textContent = "";
            }, 2000);
        })
        updateActivePage();
    }

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = 1;
        updateTableDisplay();
        updateActivePage();
    });

    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updateTableDisplay();
            updateActivePage();
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        currentPage++;
        updateTableDisplay();
        updateActivePage();
    });

    // document.getElementById("pageNumbers").addEventListener("click", (event) => {
    //     if (event.target.tagName === "LI") {
    //         currentPage = parseInt(event.target.getAttribute("value"));
    //         updateTableDisplay();
    //         updateActivePage();
    //     }
    // });

    updateTableDisplay(); // Initialize the table display
    updateActivePage(); // Initialize the pagination display
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
