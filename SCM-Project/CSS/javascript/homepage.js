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

//logout 
function logout() {

    localStorage.removeItem("Access_token");
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
   
}

