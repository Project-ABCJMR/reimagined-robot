const form = document.querySelector('form');
const searchText = document.getElementById('searchText');
const scriptHTML = document.getElementById('renderHTML')
const dropDown = document.getElementById("dropDown")
const yearURLElem = document.getElementById("yearURL")
const keyWordURLElem = document.getElementById("keyWordURL")
const selectionTextElem = document.getElementById("selectionText")
const yearURL = "https://api.api-ninjas.com/v1/historicalevents?year="
const keyWordURL = "https://api.api-ninjas.com/v1/historicalevents?text="
const invalidYear = document.getElementById("invalidYear")
const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || "[]")
const historicalEventsElem = document.getElementById("historicalEvents")
const harvardImgs = document.getElementById("harvardimgs")
const imgElem = document.getElementById("imgElem")
const artInfo = document.getElementById("artInfo")
const imgTitleElem = document.getElementById("imgTitle")
const previousBtn = document.getElementById("previous")
const nextBtn = document.getElementById("next")
const backBtn = document.getElementById("back")
const artContainer = document.getElementById("pagination-container")
const imgBtns = document.querySelector('imgBtn')
const cardConElem = document.getElementById("cardCon")
const imgContainer = document.getElementById("imgContainer")


// add event listener for search option choice
dropDown.addEventListener("click", (event) => {
  if (event.target === yearURLElem) {
    selectionTextElem.textContent = yearURLElem.textContent
    console.log(selectionTextElem.textContent)
  } else if (event.target === keyWordURLElem) {
    selectionTextElem.textContent = keyWordURLElem.textContent.trim()
    console.log(selectionTextElem.textContent)
  }
})

yearURLElem.addEventListener("click", event => {
  selectionTextElem.textContent = yearURLElem.textContent
  console.log(event)
  historicalEventsElem.style.display = "none";
  
})

keyWordURLElem.addEventListener("click", event => {
  selectionTextElem.textContent = keyWordURLElem.textContent
  console.log(selectionTextElem.textContent, event)
  historicalEventsElem.style.display = "none"
  imgElem.style.display = "column";
  imgTitleElem.style.display = "column";
})

function saveSearch(searchDate, selectionTextElem, eventHTML) {
  console.log("saveSearch called"); 
  console.log(searchDate, selectionTextElem, eventHTML)
  const selection = selectionTextElem.textContent
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || "[]")
  if (selection.trim, searchDate, eventHTML) {
  savedSearches.push({type: selection.trim(), search: searchDate, eventHTML})
  } else {
    console.log("no eventHTML data")
  }
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches))
}


function savePastSearch(searchDate) {
  // Get past searches or default to an empty array
  const pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
  // Only save the search if it's not already in the list
  if (!pastSearches.includes(searchDate)) {
    pastSearches.push(searchDate);
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  }
}

function loadPastSearches() {
  // Get past searches or default to an empty array
  const pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
  // Create past search buttons and add them to the past searches content
  pastSearchesContent.innerHTML = pastSearches
    .map((search) => `<button class="button past-search-btn">${search}</button>`)
    .join("");
}

//start of working javascript
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchDate = searchText.value;
  console.log(typeof searchDate)
  // getEvent(searchDate)
  console.log(!isNaN(searchDate))
  console.log(selectionTextElem.textContent.trim())
  previousBtn.style.display = "inline"
  nextBtn.style.display = "inline"
  cardConElem.style.display = "inline"
  loadPastSearches()

  // if, else-if, else
  if (selectionTextElem.textContent.trim() === "Century" && !isNaN(searchDate)) {

    console.log("good search")
    getEvent(searchDate);
    console.log(savedSearches)

  } else if (selectionTextElem.textContent.trim() === "Key Word" && searchDate.trim().length > 0 && isNaN(searchDate)) {
    getKeyWordEvent(searchDate)
    // saveSearch(searchDate, selectionTextElem)
    savePastSearch(searchDate)
    // saveSearch()
    
  } else if (selectionTextElem.textContent.trim() === "Key Word" && searchDate.trim().length === 0 || isNaN(searchDate) === false) {
    console.log(selectionTextElem.textContent.trim(), searchDate)
    console.log('somethings wrong')
    const invalidKeyWord = document.getElementById("invalidKeyWord")
    invalidKeyWord.style.display = "block"
    const closeModal = document.getElementById("closemodal")
    invalidKeyWord.addEventListener("click", event => {
      invalidKeyWord.style.display = "none"
    })

  } else {
    console.log(selectionTextElem.textContent.trim(), searchDate)
    console.log('somethings wrong')
    invalidYear.style.display = "block"
    const closeModal = document.getElementById("closemodal")
    invalidYear.addEventListener("click", event => {
      invalidYear.style.display = "none"
    })
  }

  });



function getEvent(searchDate) {

  //get 12 random numbers between 1 and 100
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumbers = []

for (let i = 0; i < 12; i++) {
const randomNumber = getRandomInt(1, 100); 
console.log(`randomNumber ${i}: ${randomNumber}`);
randomNumbers.push(randomNumber)

}
console.log(randomNumbers)

//randomNumbers array used to get searchDate
const searchDateN = parseInt(searchDate)
console.log(searchDateN)
const searchDateAncient = searchDateN < 1923 || searchDateN < 0
console.log(searchDateAncient)
const searchDateRecent = searchDateN >= 1923
const searchDates = []

for (let i = 0; i < randomNumbers.length; i++) {
  if(searchDateAncient) {
      const finalDate = searchDateN + parseInt(randomNumbers[i])
      console.log(searchDateAncient)
      searchDates.push(finalDate)
  } else if (searchDateRecent) {
    const finalAltDate =  1923 + parseInt(randomNumbers[i])
    searchDates.push(finalAltDate)
  }
}
console.log(searchDates);

getYearData(searchDates, searchDate)
}

async function getYearData(searchDates, searchDate) {
    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "cVYAGyxVsjKIeUf3l0dufoGDRN5uh06eJhAPjFdL");
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const allEventsData = []
    
    const eventData = await Promise.all (
      searchDates.map(async (year) => {
      const response = await fetch(yearURL + year, requestOptions)
      const historicalEventsData = await response.json();
          if (historicalEventsData.length > 0) {
            const firstEvent = historicalEventsData[0];
            allEventsData.push(firstEvent)
            
          } else {
              console.log("nothing")
          }
      })
    )
    console.log(allEventsData)
    eventHTML = renderAllEvents(allEventsData)
    getItToDom(eventHTML)
    saveSearch(searchDate, selectionTextElem, eventHTML);
    historicalEventsElem.style.display = "block"
    seeHTML(scriptHTML)
}

function renderAllEvents(allEventsData) {
  const eventHTML = allEventsData.map(item => `
    <div class="eventText" style="display: flex; flex: 1 1 29%; max-width: 400px;">
        <h2>${item.month}/${item.day}/${item.year}:</h2>
        <p>${item.event}</p>
    </div>
  `).join('');

  return eventHTML
  
}

//display results from year search to HTML
function getItToDom(eventHTML) {
scriptHTML.innerHTML = eventHTML 
}


function seeHTML(scriptHTML) {
  scriptHTML.scrollIntoView({ behavior: 'smooth' })
}
//end of working javascript












