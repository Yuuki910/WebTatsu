// Get form element
var form = document.querySelector("form");

// Listen for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    var apikey = document.querySelector("#apikey").value;
    var user_id = document.querySelector("#user_id").value;
    var guild_id = document.querySelector("#guild_id").value;

    // Store values in local storage
    localStorage.setItem("apikey", apikey);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("guild_id", guild_id);

    // Redirect back to original page
    window.location.href = "../";
});