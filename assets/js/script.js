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
    const displayHTML = render(parsedData)
    renderElem.innerHTML = displayHTML
  })
}

function parseData(dateData) {
   const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
    ];  
  const year = dateData.year;
  const [month, day] = searchDate.split('/')
  const monthText = monthNames[month-1]
  console.log(monthText)
  const eventDate = monthText + " " + day + ", " year
  console.log(eventDate)
  const link = dateData.links[1].link
  const text = dateData.text
  
  return { eventDate, link, text}
}
  
  
    function render(parsedData) {
  const eventHTML = `
    <div class="eventInfo row" style="flex">
        <div class="col-md-4 eventText">'
            <h2>On this day back in ${parsedData.eventDate}</h2>
            <p>${parsedData.text}<br></br>To find out more on this event head over here: <a href="${parsedData.link}">${parsedData.link}</a></p>
        </div>
    </div>
  `;
  
  return `
    ${eventHTML}
  `;
  console.log(eventHTML)
  }
 
