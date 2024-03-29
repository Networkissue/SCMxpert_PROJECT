
if (localStorage.getItem("Access_token") === null) {
    // console.log("im in homepage")
    window.location.href = "/";
}

if (sessionStorage.getItem("Role") === "user") {
    $("#Devicedata").css("display", "none");
}

$(document).ready(()=> {
    $("#username").text("Hi" + " " + sessionStorage.getItem("Username") + ", Welcome to SCMXpert" );
    
})
    



document.addEventListener('DOMContentLoaded', function () {
    
    // var dbContainer = document.getElementById('DB');
    // var darkMode = document.getElementById('dark_change');
    
    // darkMode.addEventListener('click', function(){
    //     darkMode.classList.toggle('activee');
    //     dbContainer.classList.toggle('night');
    // });
    
  
    const menuIcon = document.getElementById("menu_icon");
    const sidebar = document.getElementById("DB");
    const icon = document.querySelector(".icon");
    const icon1 = document.querySelector(".icon1");
    var box = document.getElementById("l1");
    var box1 = document.getElementById("l2");
    var hA = document.getElementById("ha");
    var hB = document.getElementById('hb');

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle("menuclose");
    });
    icon.addEventListener('click', () => {
        sidebar.classList.remove("menuclose");
    });
    icon1.addEventListener('click', () => {
        sidebar.classList.remove("menuclose");
    });
    box.addEventListener('click', ()=> {
        window.location.href="/Newshipment";
        
    })
    box.addEventListener('mouseover', ()=> {
        box.style.transform = 'translateX(45%)';
        hA.style.transform = 'translateX(38%)';
        box.style.fontSize = '60px';
        hA.style.fontSize = '80px';
        box.style.width = '23%';
        box.style.height = '70px';
        box.style.paddingLeft = '60px';

        box1.style.transform = 'translateX(180%)'; 
        // box1.style.transition = 'transform 0.5s ease'
        hB.style.transform = 'translateX(180%)';
        // hB.style.transition = 'transform 0.5s ease'
        // if(mouseover) {
        //     box1.style.transform = 'translateX(0)'
        })
    box.addEventListener('mouseout', ()=> {
        box.style.transform = 'translateX(0)';
        hA.style.transform = 'translateX(0)';
        box.style.fontSize = '40px';
        hA.style.fontSize = '60px';
        box.style.width = '15%';
        box.style.height = '50px';
        box1.style.transform = 'translateX(0)';
        hB.style.transform = 'translateX(0)';
    })
    box1.addEventListener('mouseover', ()=> {
    
        box.style.transform = 'translateX(-480%)';
        hA.style.transform = 'translateX(-480%)';

        box1.style.transform = 'translateX(-95%)';

        hB.style.transform = 'translateX(-58%)';
       
        box1.style.fontSize = '60px';
        hB.style.fontSize = '80px';
        box1.style.width = '26%';
        hB.style.width = '46%';
        box1.style.height = '70px';
        box1.style.paddingLeft = '90px';
        // if(mouseover) {
        //     box1.style.transform = 'translateX(0)'
        })
    box1.addEventListener('mouseout', ()=> {
        box.style.transform = 'translateX(0)';
        hA.style.transform = 'translateX(0)';

        box1.style.transform = 'translateX(0)';
        hB.style.transform = 'translateX(0)';
        box1.style.fontSize = '40px';
        hB.style.fontSize = '60px';
        box1.style.width = '17%';
        // hB.style.width = '46%';
        box1.style.height = '50px';
    })
    
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
            let option = document.querySelector('.option');
            let setting = document.querySelector('.setting');
            if (!isActive) {
                link.classList.add('active');
                if (parent.classList.contains("A")) {
                    option.style.display = 'block';
                    setting.style.display = 'none';
                    
                } else{
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

//logout 
function logout() {

    localStorage.removeItem("Access_token");
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");

}

