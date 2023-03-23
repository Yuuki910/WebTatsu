// Check if local storage variables are available otherwise redirect to login pages
if (!localStorage.getItem("apikey") || !localStorage.getItem("user_id") || !localStorage.getItem("guild_id")) {
    // Redirect to form to enter values
    alert("Please enter the details before proceeding.");
    window.location.href = `.pages/login.html`;
}

// Main Navbar Button on mobile layout
function navOpen() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
}

// Clear Local Storage values
function clearLocalStorage() {
    localStorage.removeItem("apikey");
    localStorage.removeItem("user_id");
    localStorage.removeItem("guild_id");
    alert("APIKEY, User ID and Guild ID removed!");
}

// Handles Logout Button on Navbar
function logOut() {
var result = prompt("Please select an option:\n- Type 'YES' to confirm logout.\n- Type 'RELOGIN' to edit the re-enter the login value instead.");
if (result === null) {
    console.log("User clicked Cancel");
} else {
    switch (result) {
    case "YES":
        clearLocalStorage();
        window.location.href = `.pages/login.html`;
        break;
    case "RELOGIN":
        window.location.href = `.pages/relogin.html`;
        break;
    default:
       alert("Invalid input!");
    }
}
}

