async function logJSONData() {
    try {
      const response = await fetch("http://history.muffinlabs.com/date/2/14");
      const jsonData = await response.json();
      console.log(jsonData.url); 
      console.log(jsonData)
      console.log(jsonData.data.Events[0])
    //   document.getElementById("data").textContent=jsonData.main.temp
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  
  logJSONData();
  







//search javascript
const form = document.querySelector('form');
const searchText = document.getElementById('searchText');
form.addEventListener('submit', event => {
  event.preventDefault();
  console.log("clicked")
const searchDate = searchText.value;

getEvent(searchDate)

})

function getEvent(searchDate) {
  const url = 'https://history.muffinlabs.com/date/' + searchDate

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const dateData = data.data.Events[0];
    console.log(dateData)
    const parsedData = parseData(dateData)
    console.log(parsedData)
  })
}

function parseData(dateData) {
  const year = dateData.year;
  console.log(year)
  const link = dateData.links[1].link
  const text = dateData.text
  
  

  return { year, link, text }
}
