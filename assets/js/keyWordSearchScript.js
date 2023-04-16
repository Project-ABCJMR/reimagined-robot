function getKeyWordEvent(searchDate) {
    // const myHeaders = new Headers();
    // myHeaders.append("X-Api-Key", "cVYAGyxVsjKIeUf3l0dufoGDRN5uh06eJhAPjFdL");
    // const requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };
    
    
    // // const firstEvent = await Promise.all (
    // //   searchDates.map(async (text) => {
    // //   const response = await 
    // fetch(keyWordURL + searchDate, requestOptions)
    // console.log(keyWordURL + searchDate)
    // .then(response => {
    //     if (response.ok) {
    //         return response.json()
    //     }   else {
    //         throw new Error('Network response was not ok');
    //     }    
    // })
    // .then(historicalEventsData => {
    //     if (historicalEventsData.length > 0) {
    //     const firstEvent = historicalEventsData;
    //        console.log(firstEvent)
    //      } else {
    //          console.log("nothing")
    //      }
    // })


    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "cVYAGyxVsjKIeUf3l0dufoGDRN5uh06eJhAPjFdL");
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log("fetching url:", keyWordURL + searchDate)
    fetch(keyWordURL + searchDate, requestOptions)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Network response was not ok");
    }
  })
  .then(result => {
    const allEventsData = result;
    const eventHTML = renderAllEvents(allEventsData);
    getItToDom(eventHTML);
    console.log(result);
    
    historicalEventsElem.style.display = "block"
    seeHTML(scriptHTML)
  })
  .catch(error => {
    console.error("Error:", error.message);
  });
  
          
      }
    //   )
    // )
    // console.log(allEventsData)
    // eventHTML = renderAllEvents(allEventsData)
    // getItToDom(eventHTML)
    // const historicalEventsElem = document.getElementById("historicalEvents")
    // historicalEventsElem.style.display = "block"
    // seeHTML(scriptHTML)
// }