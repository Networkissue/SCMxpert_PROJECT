$(document).ready(function() {


    if(localStorage.getItem("Access_token") === null){
        window.location.href="/";
    }
    
    if (sessionStorage.getItem("Role")==="user"){
        $("#Devicedata").css("display","none"); 
    }
        
});

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById("menu_icon");
    const sidebar = document.getElementById("DB");
    const icon = document.querySelector(".icon")
    const icon1 = document.querySelector(".icon1")
  
    menuIcon.addEventListener('click', () => {
      sidebar.classList.toggle("menuclose");
    });
    icon.addEventListener('click', () => {
        sidebar.classList.remove("menuclose");
      });
    icon1.addEventListener('click', () => {
        sidebar.classList.remove("menuclose");
      });
  });
  
 
  
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    let menuIcon = document.querySelector(".menu");
    let menu = document.querySelector(".sidebar");
   
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // event.preventDefault();
           // Remove active class from all links
            sidebarLinks.forEach(function (sidebarLink) {
                sidebarLink.classList.remove('active');
            });
            
            const isActive = link.classList.contains('active');
            // Add active class to clicked link
            const parent = link.parentElement;
            let option  = document.querySelector('.option');
            let setting = document.querySelector('.setting');
            if (!isActive) {
                link.classList.add('active');
                if (parent.classList.contains("A")) {
                     option.style.display = 'block';
                     setting.style.display = 'none';
                } else {
                     setting.style.display = 'block';
                     option.style.display = 'none';
                }
            } else {
                setting.style.display = 'none';
                option.style.display = 'none';
            }
        });

    });
    
});

///////////////////////////////////table content ////////////////////////////

// $(document).ready(()=> {

//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, '0');
//     let mm = String(today.getMonth() + 1).padStart(2, '0');
//     let yyyy = String(today.getFullYear());

//     today = dd + "/" + mm + "/" + yyyy
//     document.getElementById("Expected_Delivery_Date").min = today


// document.getElementById("button1").addEventListener("click", (e)=> {
       
//       e.preventDefault(); 
//       fetch("/Newshipment", {
        
//         method:"POST",
//         headers: {
//             "Authorization" : `Bearer ${localStorage.getItem("Access_token")}`,
//             "content-type" : "application/json"
//         },
//         body: JSON.stringify ({
//              "Shipment_Number" : $("#Shipment_Number").val(),
//              "Route_Details" : $("#Route_Details").val(),
//              "Device" : $("#Device").val(),
//              "PO_Number" : $("#PO_Number").val(),
//              "NDC_Number" : $("#NDC_Number").val(),
//              "Serial_no_Goods" : $("#Serial_no_Goods").val(),
//              "Container_Number" : $("#Container_Number").val(),
//              "Goods_Type" : $("#Goods_Type").val(),
//              "Expected_Delivery_Date" : $("#Expected_Delivery_Date").val(),
//              "Delivery_Number" : $("#Delivery_Number").val(),
//              "Batch_id" : $("#Batch_id").val(),
//              "Comment" : $("#Comment").val()

//         })
//     }).then (response => {
//         console.log(response.json())
//         if(response.ok){
//             return response.json()
//         }else {
//             throw new Error(`${response.status}`)
//         }

//     }).then (response => {
//         alert("Shipment Created Successfully")
//         window.location.href="/home"
       
//     }).catch(error => {

//                $("#message").text(error.message)
//     })
// })
// })

// //logout 
// function logout() {

//     localStorage.removeItem("Access_token");
//     sessionStorage.removeItem("Username");
//     sessionStorage.removeItem("Email");
//     sessionStorage.removeItem("Role");
//     window.localStorage.href = "/"
// }


$(document).ready(() => {
    // Initialize Expected_Delivery_Date input field with the current date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = String(today.getFullYear());

    today = dd + "/" + mm + "/" + yyyy;
    document.getElementById("Expected_Delivery_Date").min = today;

    // Handle form submission for creating a new shipment
    document.getElementById("button1").addEventListener("click", (e) => {
        e.preventDefault();
        fetch("/Newshipment", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("Access_token")}`,
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
        }).then(response => {
            console.log(response.json());
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`${response.error}`);
            }
        }).then(response => {
            alert("Shipment Created Successfully");
            window.location.href = "/home";
        }).catch(error => {
            $("#message").text(error.message);
        });
    });
});

// Logout function
function logout() {
    localStorage.removeItem("Access_token");
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
    window.location.href = "/";
}
