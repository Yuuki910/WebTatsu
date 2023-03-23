// Handle Link Location on Navbar Buttons
var pathname = window.location.pathname; // Get the current pathname
var home_path = ""
var base_path = ""

if (window.location.pathname=="/" || window.location.pathname=="/index.html") { // Check if the current page is index.html
    base_path = "pages/"
} else {
    home_path = "../"
}

// Check if local storage variables are available otherwise redirect to login pages
if (!localStorage.getItem("apikey") || !localStorage.getItem("user_id") || !localStorage.getItem("guild_id")) {
    // Redirect to form to enter values
    alert("Please enter the details before proceeding.");
    window.location.href = `${base_path}login.html`;
}

// // This function is used on external navbar to redirect to the other pages
// function redirectPage(pagename){
//     var local_path = "";
//     var local_page = "";
//     if(pagename=="home"){
//         local_path = home_path;
//         local_page=="";
//     } else {
//         local_path = base_path;
//         local_page=`${pagename}.html`;
//     }
//     window.location.href = `${local_path}${local_page}`;
// }

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
        window.location.href = `${base_path}login.html`;
        break;
    case "RELOGIN":
        window.location.href = `${base_path}relogin.html`;
        break;
    default:
       alert("Invalid input!");
    }
}
}

// Function that add navbar to the html but need to create a div with id="navbar"
window.addEventListener("DOMContentLoaded", function() {
    var navbarDiv = document.getElementById("navbar");
    fetch(`${base_path}navbar.html`)
        .then(response => response.text())
        .then(data => {
            navbarDiv.innerHTML = data;
            return navbarDiv;
        })
        .then(navbarDiv => {
        //This regex get the filename without ".html"
        let local_path = "";
        if(pathname=="/"||pathname=="/index.html"){
            local_path = "home";
        }else {
            let match = pathname.match(/\/(\w+)\.html/);
            local_path = match[1];
        }
        const btn = navbarDiv.querySelector(`.btn-${local_path}`);
        if (btn) {
            btn.classList.add("active");
            console.log(pathname);
        }
    })
      .catch(error => console.error(error));
  });


//toggle themes
let theme = localStorage.getItem("theme")
  const changeTheme = () => {
    if(!theme){
        theme = "white"
        localStorage.setItem("theme", theme)
    }
    if(theme == "white"){
        localStorage.setItem("theme", "dark")
        theme = "dark"
        let element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", "../css/dark.css");
        element.setAttribute("id", "themes");
        document.getElementsByTagName("head")[0].appendChild(element);
    }
    else{
        localStorage.setItem("theme", "white")
        theme = "white"
        const element = document.getElementById("themes");
        element.remove();
    }
  }

let baseUrl = redirectPage(null, null, true) //page = null ||| args = null ||| 3rd argument is just to get the path
//loads theme onLoad
if(theme == "dark"){
    let element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", `..${baseUrl}/css/dark.css`);
    element.setAttribute("id", "themes");
    document.getElementsByTagName("head")[0].appendChild(element);
}