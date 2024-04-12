document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const newp = document.getElementById("New_password").value;
        const Cpass = document.getElementById("confirm_password").value;
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("New_password", newp);
        formdata.append("confirm_password", Cpass);
        if (email !== "" && newp !== "" && Cpass !== "") {
            fetch("/Password_Update", {
                method: "POST",
                body: formdata,
            }).then(response => {
                // console.log(response.json())
                return response.json()
            }).then(data => {
                
                if ("error" in data) {
                    $("#error").text(data.error)
                    setTimeout(() => {
                        $("#error").text("")
                    }, 1000)
                }
                
                else {
                    $("#error").text("Password Updated Successfully")
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 500)
                }
            })
        }else {
            $("#error").text("Please Enter the Fields...")
            setTimeout(() => {
                $("#error").text("")
            }, 1000)
        }
    })
})