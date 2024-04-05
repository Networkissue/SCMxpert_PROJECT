if(localStorage.getItem("Access_token") === null){
    window.location.href="/"
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("Save").addEventListener("click", (e) => {
        e.preventDefault();
        const token = localStorage.getItem("Access_token");
        if (token) {
            //token is available, making authentication process
            const form = new FormData()
            form.append("user", $("#user").val());
            fetch("/Update_Role", {
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("Access_token"),
                },
                body: form,
            }).then(response => {
                return response.json();
            })
                .then(response => {

                    $("#error").text(response.message);
                })

                .catch(error => {
                    $("#error").text(error);
                });



        }else {

            alret ("Unauthorized Credintials, Redirecting to Homepage...")
            window.location.href="/"
        }
    })



})