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
const imgs = []
const totalPages = 6
currentPage = 1
console.log(currentPage)
const harvardURL = `https://api.harvardartmuseums.org/object?&apikey=28d8f398-d2ea-4c6c-bfe0-53c46eed6acb&hasimage=1&keyword=${searchDate}&q=NOT+image.description:null&page=`
console.log(harvardURL + currentPage)
    console.log(totalPages)
    for(let currentPage = 1; currentPage <= totalPages; currentPage++ ){
    fetch(harvardURL + currentPage) 
    .then(response => {
        console.log("fetch to harvard url succeeded", response);
        if (response.ok) {
           return response.json();
        } else {
            throw new Error("harvard fetch response no good");
        } 
    })   
    .then(data => {
        console.log(data)
        data.records.forEach(record => {
            if (record.images && record.images[0] && record.images[0].baseimageurl) {
                console.log(record.images[0].baseimageurl)
                const imgURL = record.images[0].baseimageurl
                imgs.push(imgURL)
                console.log(imgs)
                

            } else if (!record.images || !record.images[0] || !record.images[0].baseimageurl) {
                console.log('no baseimage url')
            }
        })
    })





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

// function renderImgs(imgs) {
//     const imgHTML = imgs.map(item => 
    
//     )
// }