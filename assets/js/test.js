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
const historyDropDown = document.getElementById('historyDropDown')
const option = document.querySelector('.option')


// change selectionTextElem to the choice
// function for getting text data

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
  console.log("year")
  historicalEventsElem.style.display = "none"
})

keyWordURLElem.addEventListener("click", event => {
  selectionTextElem.textContent = keyWordURLElem.textContent
  console.log(selectionTextElem.textContent)
  historicalEventsElem.style.display = "none"
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


//start of working javascript
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchDate = searchText.value;
  console.log(typeof searchDate)

  console.log(!isNaN(searchDate))
  console.log(selectionTextElem.textContent.trim())

      
  
  // if, else-if, else
  if (selectionTextElem.textContent.trim() === "Year" && !isNaN(searchDate)) {

    console.log("good search")
    getEvent(searchDate);
    console.log(savedSearches)

  } else if (selectionTextElem.textContent.trim() === "Key Word" && searchDate.trim().length > 0 && isNaN(searchDate)) {
    getKeyWordEvent(searchDate)
     form.style.display = "none";
  dropDown.style.display = "none";
  
      backBtn.style.display = "inline";
      previousBtn.style.display = "inline";
      nextBtn.style.display = "inline";
      imgElem.style.display = "block";
      imgTitle.style.display = "inline";
      scriptHTML.style.display = "flex";
      artInfo.style.display = "inline";
     //saveSearch(searchDate, selectionTextElem)
    
    // saveSearch()
    
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

//working code start

function getEvent(searchDate) {
    scriptHTML.style.display = "flex"
    dropDown.style.display = "none"
    form.style.display = "none"
    backBtn.style.display = "block"
    artContainer.style.display = "block"
    nextBtn.style.display = "none"
    previousBtn.style.display = "none"

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

//fetch data from the first index of each year
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

//display results from year search to HTML set disply for other elements
function getItToDom(eventHTML) {
scriptHTML.innerHTML = eventHTML 
//   nextBtn.style.display = "inline";
//   previousBtn.style.display = "inline";
//   backBtn.style.display = "inline";

}

//scroll page up if displayed data is not in view
function seeHTML(scriptHTML) {
  scriptHTML.scrollIntoView({ behavior: 'smooth' })
}


//function to get historical data from Year search
async function getKeyWordEvent(searchDate) {
    const imgs = []
    const totalPages = 6
    currentPage = 1
    console.log(currentPage)
    const harvardURL = `https://api.harvardartmuseums.org/object?&apikey=28d8f398-d2ea-4c6c-bfe0-53c46eed6acb&hasimage=1&keyword=${searchDate}&q=NOT+image.description:null&page=`
    console.log(harvardURL + currentPage)
    console.log(totalPages)
    const fetchedImgs = []
    //parse images from the first 6 pages returned from 
    for(let currentPage = 1; currentPage <= totalPages; currentPage++ ) {
        const waitForImages = fetch(harvardURL + currentPage) ;
        fetchedImgs.push(waitForImages)
    }
  
    try {
      const responses = await Promise.all(fetchedImgs)
        
      for (const response of responses) {
        if (response.ok) {
          const data = await response.json();
          console.log(data)
      
        data.records.forEach(record => {
            if (record.images && record.images[0] && record.images[0].baseimageurl && record.title) {
                console.log(record.images[0].baseimageurl)
                const imgURL = record.images[0].baseimageurl
                const imgTitle = record.title
                console.log(imgs)
              
              const artistName = record.people[0]?.displayname || '';
              const birthDeathDate = record.people[0]?.displaydate || '';
               const culture = record.people[0]?.culture || '';
              const birthPlace = record.people[0]?.birthplace || '';
              
              let nameInput = '';
              let birthDeath = '';
              let cultureInput = '';
              let birthPlaceInput = '';

  if (artistName !== '') {
    nameInput = "The name of the artist is " + artistName;
  }

  if (birthDeathDate !== '') {
    birthDeath = "and lived approximately " + birthDeathDate;
  }

  if (culture !== '') {
    cultureInput = ". He was " + culture;
  }

  if (birthPlace !== '') {
    birthPlaceInput = "from" + birthPlace;
  }
              
  const description = record.description || '';
              
            
          
           imgs.push({
            imgURL,
            imgTitle,
            nameInput,
            birthDeath,
            cultureInput,
            birthPlaceInput,
            description
           
          });
          
          } else if (!record.images || !record.images[0] || !record.images[0].baseimageurl) {
              console.log('no baseimage url')
          } 
          })
            } 
            
            }
        } catch (error) {
        console.error('Error fetching images:', error.message);
      }
  
    try {
        const lastPage = imgs.length
        console.log(lastPage)
        const pageSize = 1;
        let currentPage = 1;
        function renderImages() {
            const birthDeath = imgs[currentPage-1].birthDeath || '';
            const culture = imgs[currentPage-1].cultureInput || '';
            const birthPlace = imgs[currentPage-1].birthPlaceInput || '';
            const artistName = imgs[currentPage-1].nameInput || '';
            const displayedImg = imgs[currentPage-1].imgURL;
            const description = imgs[currentPage-1].description || '';
            const imgElemHTML = `<img src="${displayedImg}">`;
            const artInfoHTML = `<p>${artistName}  ${culture}  ${birthPlace}  ${birthDeath} ${description}</p>`
            const displayedImgTitle = imgs[currentPage-1].imgTitle
            console.log(displayedImg)
            imgTitleElem.innerHTML = displayedImgTitle
            imgElem.innerHTML = imgElemHTML
            artInfo.innerHTML = artInfoHTML
            console.log(artInfoHTML)
  
            previousBtn.disabled = currentPage === 1
            nextBtn.disabled = currentPage === lastPage
      }
  
    function showPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            renderImages();
        }
    }
  
    previousBtn.addEventListener('click', showPreviousPage)
    nextBtn.addEventListener('click', showNextPage)
  
    function showPreviousPage() {
        console.log("clicked previous button")
        if(currentPage > 1) {
            currentPage--;
            renderImages()
        }
    }
  
    function showNextPage() {
        console.log("clicked next button")
        if (currentPage < lastPage) {
            currentPage++;
            renderImages();
        }
    }
    displayArtButtons()
    
  
    } catch (error) {
    console.error('Error rendering images', error.message)
    }
  
    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "cVYAGyxVsjKIeUf3l0dufoGDRN5uh06eJhAPjFdL");
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log("fetching url:", keyWordURL + searchDate)
    try {
        const response = await fetch(keyWordURL + searchDate, requestOptions);
        if (!response.ok) {
        throw new Error("response no good")
        }
    
        const allEventsData = await response.json()
    const eventHTML = renderAllEvents(allEventsData);
    
    function saveArtSearch(searchDate, eventHTML, imgs) {
        const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || "[]")
        savedSearches.push({ search: searchDate, history: eventHTML, imgs })
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    }
    // savedSearches.push({searchDate, selectionTextElem, eventHTML, artInfoHTML, imgElemHTML})
  
    renderImages()
    getItToDom(eventHTML);
    saveArtSearch( searchDate, eventHTML, imgs )
    console.log("save art search called");
    
    historicalEventsElem.style.display = "block"
    seeHTML(scriptHTML)
    
    
    } catch (error) {
    console.error("Error");
    }
  
  }
   
  function displayArtButtons() {

    artContainer.style.display = "inline" 
    imgBtns.style.display = "inline"
    
}

  backBtn.addEventListener("click", event => {
    if (event.target = backBtn) {
      console.log("clicked back button")
      form.style.display = "block";
      dropDown.style.display = "block";
      backBtn.style.display = "none";
      previousBtn.style.display = "none";
      nextBtn.style.display = "none";
      imgElem.style.display = "none";
      imgTitle.style.display = "none";
      scriptHTML.style.display = "none";
      artInfo.style.display = "none";
      historicalEventsElem.style.display = "none"
      
      
     
    } else{
      console.log("couldn't go back to the home display settings")
    }
  })


