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
}
// Get localStorage values
let apikey = localStorage.getItem('apikey');
let user_id = localStorage.getItem('user_id');
let guild_id = localStorage.getItem('guild_id');
let table = document.getElementById("table-board");
let prevPage = document.getElementById("pg-prev");
let nextPage = document.getElementById("pg-next");
let stateShowNames = localStorage.getItem("showNames")
let showNames = document.getElementById("showNames")
stateShowNames && (showNames.innerHTML = "Show Names: " + stateShowNames)
let api = new TatsuAPI(apikey);
let obj_board
let usernames

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
if(stateShowNames != "true"){
  let rowToDelete = table.rows[0]
  rowToDelete.deleteCell(3)
}
const fillTable = async() => {
  const data = await getObjBoard()
  const fillRows = (i, rankCell, scoreCell, idCell, nameCell, username) => {
    rankCell.textContent = data[i].rank;
    scoreCell.textContent = data[i].score;
    idCell.textContent = data[i].user_id;
    nameCell && (nameCell.textContent = username) //if stateShowNames == true
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

    if(stateShowNames == "true"){
      nameCell = row.insertCell(3)
      await getUsername(i, rankCell, scoreCell, idCell, nameCell)
    }

    else{
      fillRows(i, rankCell, scoreCell, idCell)
    }
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
    stateShowNames = "false"
    localStorage.setItem("showNames", stateShowNames)
    showNames.innerHTML = "Show Names: " + stateShowNames 
    return
  }

  stateShowNames == "true" ? stateShowNames = "false" : stateShowNames = "true"
  localStorage.setItem("showNames", stateShowNames)
  showNames.innerHTML = "Show Names: " + stateShowNames

}