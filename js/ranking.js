//Get value from ?page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page')
const URL = window.location.hostname
let path = "/"

if(URL == "127.0.0.1" || URL == "localhost"){
  console.log("You're using localhost!")
}
else{
  path = "/webtatsu/"
  console.log("You're using GitHub!")
}

// Page cannot be null it will redirect to page 0 which is original page
if(page == null || page == "undefined" || page < 1){
  window.location.href = redirectPage("ranking", "?page=1")
  page=1
}
// Get localStorage values
let apikey = localStorage.getItem('apikey');
let user_id = localStorage.getItem('user_id');
let guild_id = localStorage.getItem('guild_id');
let table = document.getElementById("table-board");
let prevPage = document.getElementById("pg-prev");
let nextPage = document.getElementById("pg-next");
let showNames = document.getElementById("showNames")
let reloadButton = document.getElementById("reload")
let api = new TatsuAPI(apikey);
let stateShowNames
let obj_board
let usernames

//idk why, but stateShowNames = Boolean(localStorage.getItem("showNames")) doesn't work, so we have to use this
if(localStorage.getItem("showNames") == "true")
  stateShowNames = true
else
  stateShowNames = false

showNames.innerHTML = "Show Names: " + stateShowNames

// Get user ranking
async function getUserRankInGuild(member_id) {
  return await api.getUserRankInGuild(member_id, guild_id, "all")
}

// Get leaderboard ranking
async function getGuildLeaderboard() {
  return await api.getGuildLeaderboard(guild_id, page-1, "all")
}

async function getObjBoard() {
  obj_board = await getGuildLeaderboard();
  return obj_board.rankings
}

// Get a reference to the table element in your HTML

// Loop over the array and generate a row for each object
if(!stateShowNames){
  let rowToDelete = table.rows[0]
  rowToDelete.deleteCell(3)
}
const fillTable = async() => {
  const data = await getObjBoard()
  const fillRows = (i, rankCell, scoreCell, idCell, nameCell, username) => {
    rankCell.textContent = data[i].rank;
    scoreCell.textContent = data[i].score;
    idCell.textContent = data[i].user_id;
    nameCell && (nameCell.textContent = username) //if passed nameCell
  }

  const getUsername = async(i, rankCell, scoreCell, idCell, nameCell) => {
    await api.getUserProfile(data[i].user_id).then((data) => {    
      fillRows(i, rankCell, scoreCell, idCell, nameCell, data.username)
    });
  }
  
  for (let i = 0; i < 10; i++) { // Display 10 users here
    let row = table.insertRow(); // Create a new row in the table
    let rankCell = row.insertCell(0); // Add a cell for the rank
    let scoreCell = row.insertCell(1); // Add a cell for the score
    let idCell = row.insertCell(2); //Add a cell for the id
    let nameCell // Add a cell for the name

    if(stateShowNames){
      nameCell = row.insertCell(3)
      await getUsername(i, rankCell, scoreCell, idCell, nameCell)
    }

    else{
      fillRows(i, rankCell, scoreCell, idCell)
    }
    //when table filled, make "show names" button available
    if(i==9) showNames.classList.remove("unavailable")
  }

}
// Fill the table with values gotten from api
fillTable();

// Pagination Buttons Handler

// Previous and Next Page Button Handler
page == 1 && (prevPage.classList.add("unavailable"))

prevPage.addEventListener('click', ()=>{
  if(page > 1) window.location.href = redirectPage("ranking", "?page=" + (Number(page) - 1)) // if page > 1 then go to prev page
})
nextPage.addEventListener('click', ()=>{
    window.location.href = redirectPage("ranking", "?page=" + (Number(page) + 1)) // infinite next pages
})


// Numbering Page Buttons

// Search for all pagination-button class in an array
const paginationButtons = document.querySelectorAll(".pagination-button")
// Loop to replace button with new number after clicking on next page
paginationButtons.forEach((button, index) => {
  let address = Number(Number(page) + Number(index)-5)

  if(page < 6){
    index == page-1 && button.classList.add("active-page")
    button.setAttribute('href', redirectPage("ranking", "?page=" + Number(Number(index)+1)))
    button.innerHTML = Number(Number(index)+1)
  }
  else{
    index == 5 && button.classList.add("active-page") // active button is in the middle, 5th button to be exact
    button.setAttribute('href', redirectPage("ranking", "?page=" + address))
    button.innerHTML = address
  }

});


const toggleNames = () =>{
  if(stateShowNames == null){
    stateShowNames = false
    localStorage.setItem("showNames", stateShowNames)
    showNames.innerHTML = "Show Names: " + stateShowNames 
    return
  }

  // When you toggled, the table reloads and toggle button is not available
  showNames.classList.add("unavailable")
  clearTable()
  fillTable()

  stateShowNames = !stateShowNames
  localStorage.setItem("showNames", stateShowNames)
  showNames.innerHTML = "Show Names: " + stateShowNames

}

const clearTable = () => {// This func clears table and fills thead tag
  table.innerHTML = ""
  let row = table.insertRow(0);
    row.insertCell(0).outerHTML = "<th>Rank</th>"
    row.insertCell(1).outerHTML = "<th>Score</th>"
    row.insertCell(2).outerHTML = "<th>User ID</th>"
  !stateShowNames && (row.insertCell(3).outerHTML = "<th>Name</th>")
}