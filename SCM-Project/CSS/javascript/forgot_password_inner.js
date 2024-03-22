if(location.getItem("Access_token") === null) {
    window.location.href="/";
}

document.addEventListener("DOMContentLoaded",() => {
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();

    //get user input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("New_password").value;
    const confirm = document.getElementById("confirm_password").value;

    const form = new FormData();
    form.append("email", email);
    form.append("New_password",password );
    form.append("confirm_password", confirm);
   
    //call the authenticate function by form
    authenticate(form);
})
});

// function to authenticate user 
function authenticate(form) {
    //making post method 
    fetch("/Password_Update_inner", {
        method : "POST",
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("Access_token")}`
        },
        body : form, 
    }).then(response => {
        if(!response.ok){
            throw new Error(`${response.status}`);
        }else {
            return response.json();
        }
    }).then(response =>{
          alert("Password updated");
          window.location.href="/login";  
    }).catch(error => {
        $("#error").text(error.message);
    })

    
};