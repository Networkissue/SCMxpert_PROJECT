
if (localStorage.getItem("Access_token") === null) {
    // console.log("im in homepage")
    window.location.href = "/";
}


$(document).ready(() => {
    $("#username").text("Hi" + " " + sessionStorage.getItem("Username") + ", Welcome to SCMXpert");

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
    box.addEventListener('click', () => {
        window.location.href = "/Newshipment";

    })
    box1.addEventListener('click', () => {
        window.location.href = "/devicedata";

    })
    if (sessionStorage.getItem("Role") === "user") {
        $("#Devicedata").css("display", "none");
        $("#hb").css("display", "none");
        $("#l2").css("display", "none");
        $("#l1").css("transform", 'translateX(93%)')
        $("#ha").css("transform", 'translate(47%, 35.5%)')
        $("#l1").mouseover(function() {
            $(this).css( {"font-size": "60px", "width": "23%", "height": "70px", "padding-left": "70px", "transform" : "translateX(45%)"});
            $("#ha").css({"font-size": "80px", "transform" : "translateX(40%)"});
        });
        $("#l1").mouseout(function() {
            $(this).css({"font-size": "40px", "width": "15%", "height" : "50px", "transform" : "translateX(90%)"});
            $("#ha").css({"font-size": "60px", "transform" : "translate(47%, 35%)"});
        });
        
    }

    if (sessionStorage.getItem("Role") === "admin") {
        
       
        box.addEventListener('mouseover', () => {
            
            // box.style.transform = 'translateX(45%)';
            // hA.style.transform = 'translateX(38%)';
            box.style.fontSize = '45px';
            hA.style.fontSize = '80px';
            box.style.width = '17%';
            box.style.height = '60px';
            box.style.paddingLeft = '75px';

            // box1.style.transform = 'translateX(180%)';
            // box1.style.transition = 'transform 0.5s ease'
            // hB.style.transform = 'translateX(180%)';
            // hB.style.transition = 'transform 0.5s ease'
            // if(mouseover) {
            //     box1.style.transform = 'translateX(0)'
        })
        box.addEventListener('mouseout', () => {
            box.style.transform = 'translateX(0)';
            hA.style.transform = 'translateX(0)';
            box.style.fontSize = '40px';
            hA.style.fontSize = '60px';
            box.style.paddingLeft = '40px';
            box.style.width = '15%';
            box.style.height = '50px';
            box1.style.transform = 'translateX(0)';
            hB.style.transform = 'translateX(0)';
        })
        box1.addEventListener('mouseover', () => {

            // box.style.transform = 'translateX(-480%)';
            // hA.style.transform = 'translateX(-480%)';

            box1.style.transform = 'translateX(-5%)';

            // hB.style.transform = 'translateX(-58%)';

            box1.style.fontSize = '55px';
            hB.style.fontSize = '70px';
            box1.style.width = '24%';
            hB.style.width = '46%';
            box1.style.height = '70px';
            box1.style.paddingLeft = '75px';
            // if(mouseover) {
            //     box1.style.transform = 'translateX(0)'
        })
        box1.addEventListener('mouseout', () => {
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
    }
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

//logout 
$(document).ready(()=>{
    $("#logout").on("click",(e)=>{
        e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/"
    })
})
