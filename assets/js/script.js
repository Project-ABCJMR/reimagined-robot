const form = document.querySelector('form');
const searchText = document.getElementById('searchText');
const scriptHTML = document.getElementById('renderHTML')



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
eventHTML = renderAllEvents(allEventsData)
scriptHTML.innerHTML = allEventsHTML 

}
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








function renderAllEvents(allEventsData) {
  const eventHTML = allEventsData.map(item => `
    <div class="eventInfo row" style="flex">
      <div class="col-md-3 eventText">
        <h2>On ${item.month}/${item.day}/${item.year}</h2>
        <p>${item.event}</p>
    </div>
    <div>
  </div>;
  `).join('');

  return eventHTML

}














