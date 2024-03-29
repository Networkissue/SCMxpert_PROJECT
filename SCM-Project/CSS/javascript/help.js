if(localStorage.getItem("Access_token")=== null){

    window.location.href="/"
}

$(document).ready(()=> {

    $("#button").click((event)=> {
        
        event.preventDefault();
        window.location.href="/home"
        
    })
})