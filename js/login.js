// Get form element
var form = document.querySelector("form");

var apikey = document.querySelector("#apikey")
var user_id = document.querySelector("#user_id")
var guild_id = document.querySelector("#guild_id")

if(sessionStorage.getItem("apikey")){
    apikey.value = sessionStorage.getItem("apikey")
    user_id.value = sessionStorage.getItem("user_id")
    guild_id.value = sessionStorage.getItem("guild_id")
}


// Listen for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values

    // Store values in local storage
    localStorage.setItem("apikey", apikey.value);
    localStorage.setItem("user_id", user_id.value);
    localStorage.setItem("guild_id", guild_id.value);
    sessionStorage.setItem("apikey", apikey.value);
    sessionStorage.setItem("user_id", user_id.value);
    sessionStorage.setItem("guild_id", guild_id.value);

    // Redirect back to original page
    window.location.href = "../";
});