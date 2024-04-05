


document.addEventListener("DOMContentLoaded", function () {

    // CAPTCHA generator function
    function generatingcaptcha() {
        const captchaElement = document.getElementById("captcha");
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = '';

        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        captchaElement.textContent = captcha;
    }

    // Generate CAPTCHA on page load
    generatingcaptcha();

    // Generate new CAPTCHA when the button is clicked
    document.getElementById("generateCaptchaBtn").addEventListener("click", function () {
        generatingcaptcha();
    });

    document.getElementById("submit").addEventListener('click', function (e) {
        e.preventDefault();
         
        const userCaptcha = document.getElementById("userCaptcha").value;
        const generatedCaptcha = document.getElementById("captcha").textContent;




        const formdata = new FormData();
        formdata.append("email", $("#email").val());
        formdata.append("password", $("#password").val());
        if (formdata.get("email") !== "" && formdata.get("password") !== "") {
            if (userCaptcha === generatedCaptcha) {
                fetch("/login", {
                    method: "post",
                    body: formdata
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return response.json().then(error => {
                                throw new Error(error.detail);
                            });
                        }
                    })
                    .then(response => {
                        localStorage.setItem("Access_token", `Bearer ${response.access_token}`);
                        sessionStorage.setItem("Username", response.Username);
                        sessionStorage.setItem("Email", response.email);
                        sessionStorage.setItem("Role", response.Role);
                        if (localStorage.getItem("Access_token") !== null) {
                            window.location.href = "/home";
                        }
                    })
                    .catch(error => {

                        $("#error").text(`${error.message}`);
                        setTimeout(function () {
                            $("#error").text("");
                        }, 2000);
                    });
            } if (userCaptcha === '') {

                $("#error").text("Please Enter Captcha");
                setTimeout(() => {
                    $('#error').text("");
                }, 2000);
            } 
        } else {
            $("#error").text("Please enter the input fields");
            setTimeout(() => {
                $("#error").text("");
            }, 2000);
        }
    })

})

//logout 
function logout() {

    localStorage.removeItem("Access_token");
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
    window.localStorage.href = "/"
}