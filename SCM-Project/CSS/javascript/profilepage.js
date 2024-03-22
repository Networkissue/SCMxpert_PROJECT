if (localStorage.getItem("Access_token") === null){
    window.location.href="/";
}

// Get the element with the specified class



$(document).ready(() => {

    $("#Username").text(sessionStorage.getItem("Username"));
    $("#Email").text(sessionStorage.getItem("Email"));
    $("#Role").text(sessionStorage.getItem("Role"));

    const element = document.querySelector('.top_sub_link');

// Check if the element exists and contains data
if (element.length > 0) {
  // If element exists and contains data, make it visible
  element.style.display = 'block';
} 
// else {
//   // If element does not exist or does not contain data, hide it
//   element.style.display = 'none';
  
// }
else {
    // If element does not exist or does not contain data, show "No data available" message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'No data available';
    element.appendChild(messageDiv); // Append the message div to the element
    

 
if (sessionStorage !== null){
    messageDiv.style.display = "none"
}
}

    
});