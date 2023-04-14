const form = document.querySelector('form');
const searchText = document.getElementById('searchText');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchDate = searchText.value;
  getEvent(searchDate);
  
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

getYearData(searchDates)

async function getYearData(searchDates) {

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
      const response = await fetch("https://api.api-ninjas.com/v1/historicalevents?year=" + year, requestOptions)
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

}













}
















// function parseHistoricalEvent(historicalEvents) {
//   const focusEventIndex = historicalEvents[0]
//   const year = 
//   console.log(focusEventIndex)


// }

























// /* //search javascript */
// const form = document.querySelector('form');
// const searchText = document.getElementById('searchText');
// const renderElem = document.getElementById('renderHTML')
// form.addEventListener('submit', event => {
//   event.preventDefault();
//   console.log("clicked")
// const searchDate = searchText.value;

// getEvent(searchDate)

// })

// function parseData(dateData, searchDate) {
  
//   const monthNames = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December'
// ];

//   const year = dateData.year;
//   const  [month, day] = searchDate.split("/")
//   const monthText = monthNames[month-1]
//   console.log(monthText)
//   const eventDate = monthText + " " + day + ", " + year
//   console.log(eventDate)
//   const link = dateData.links[1].link
//   const text = dateData.text
  
//   return { eventDate, link, text }
// }


// function getEvent(searchDate) {
//   const url = 'https://history.muffinlabs.com/date/' + searchDate

//   fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const dateData = data.data.Events[0];
//     console.log(dateData)
//     const parsedData = parseData(dateData, searchDate)
//     console.log(parsedData)
//     const displayHTML = render(parsedData)
//     renderElem.innerHTML = displayHTML
//     })
// }




//alternate getEvent() for all events on date
// function getEvent(searchDate) {
//   const url = 'https://history.muffinlabs.com/date/' + searchDate

//   fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const dateData = data.data.Events;
//     console.log(dateData)
//     // const parsedData = parseData(dateData, searchDate)
//     // console.log(parsedData)
//     // const displayHTML = render(parsedData)
//     // renderElem.innerHTML = displayHTML
//     const mostData = parseData(dateData)
//     console.log(mostData)
//     const eventDate = parseDate(searchDate)
//     const eventsHTML = renderHTML(mostData, eventDate)
//     console.log(eventDate)
//     renderElem.innerHTML = eventsHTML
//     })
// }

// function parseDate(searchDate) {
//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ];
  
// const  [month, day] = searchDate.split("/");
// const monthText = monthNames[month-1];
// const eventDate = monthText + " " + day + ", ";

// return eventDate

// }

// function parseData(dateData) {

//     const mostData = dateData.map(item => ({
    
//     year: item.year,
//     text: item.text,
//     html: item.html,
//     links: item.links.map((linkObj) => linkObj.link)
//     }));
    
//     return mostData
    
// }


// function renderHTML(mostData, eventDate) {
  
  
//   const realEventDate = eventDate + year

//   const eventsHTML = mostData.map(item => `
  
//   <div class="eventInfo row" style="flex">
//     <div class="col-md-3 eventText">
//       <h2>On this day back in ${realEventDate}</h2>
//       <p>${item.text}<br></br>Links: ${links.map((linkObj) => `<a href="${item.link}">${item.link}</a>`)
//       .join(", ")}</p>
//     </div>
//     <div>
//   </div>;
//   `).join('')
  
//   return `
//   <div class="event">${eventsHTML}</div>
//   `;
//   }


