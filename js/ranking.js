const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//Get value from ?page
const page = urlParams.get('page')

// Page cannot be null it will redirect to page 0 which is original page
console.log(page)
if(page == null || page== "undefined"){
//   page = 0
  window.location.href = '/webtatsu/pages/ranking.html?page=0'
}
// Get localStorage values
let apikey = localStorage.getItem('apikey');
let user_id = localStorage.getItem('user_id');
let guild_id = localStorage.getItem('guild_id');
let table = document.getElementById("table-board");
let prevPage = document.getElementById("pg-prev");
let nextPage = document.getElementById("pg-next");
let api = new TatsuAPI(apikey);
let obj_board
let usernames

// Get user ranking
async function getUserRankInGuild(member_id) {
  return await api.getUserRankInGuild(member_id, guild_id, "all")
}

// Get leaderboard ranking
async function getGuildLeaderboard() {
  return await api.getGuildLeaderboard(guild_id, page, "all")
}

const getObjBoard = async() => {
  obj_board = await getGuildLeaderboard();
  return obj_board.rankings
}

// Get a reference to the table element in your HTML

// Loop over the array and generate a row for each object
const fillTable = async() => {
  const data = await getObjBoard()

  const getUsername = async(i, rankCell, scoreCell, idCell, nameCell) => {
    await api.getUserProfile(data[i].user_id).then((value) => {
      console.log(`Called ${i}`, value.username)
    
      rankCell.textContent = data[i].rank;
      scoreCell.textContent = data[i].score;
      idCell.textContent = data[i].user_id;
      nameCell.textContent = value.username
      }
    );
  }
  for (let i = 0; i < 10; i++) { // Display 10 users here
    let row = table.insertRow(); // Create a new row in the table
    let rankCell = row.insertCell(0); // Add a cell for the rank
    let scoreCell = row.insertCell(1); // Add a cell for the score
    let idCell = row.insertCell(2); //Add a cell for the id
    let nameCell = row.insertCell(3); // Add a cell for the name

    await getUsername(i, rankCell, scoreCell, idCell, nameCell)
  }
}
// Fill the table with values gotten from api
fillTable();

// Pagination Buttons Handler

// Previous and Next Page Button Handler
page == 0 && (prevPage.classList.add("unavailable"))

prevPage.addEventListener('click', ()=>{
  console.log(page) 
  if(page > 0){
    window.location.href = '/webtatsu/pages/ranking.html?page=' + (Number(page) - 1)
  }
})
nextPage.addEventListener('click', ()=>{
console.log(page)  
  window.location.href = '/webtatsu/pages/ranking.html?page=' + (Number(page) + 1)
})


// Numbering Page Buttons

// Search for all pagination-button class in an array
const paginationButtons = document.querySelectorAll(".pagination-button")
// Loop to replace button with new number after clicking on next page
paginationButtons.forEach((button, index) => {
  let address = Number(Number(page) + Number(index)) + 1
  console.log(address)

  index == 0 && button.classList.add("active-page")
  button.setAttribute('href', `/webtatsu/pages/ranking.html?page=${address}`)
  button.innerHTML = address
});
