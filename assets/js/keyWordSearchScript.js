async function getKeyWordEvent(searchDate) {

    
    const imgs = []
    const totalPages = 6
    currentPage = 1
    console.log(currentPage)
    const harvardURL = `https://api.harvardartmuseums.org/object?&apikey=28d8f398-d2ea-4c6c-bfe0-53c46eed6acb&hasimage=1&keyword=${searchDate}&q=NOT+image.description:null&page=`
    console.log(harvardURL + currentPage)
    console.log(totalPages)
    const fetchedImgs = []
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
            console.log("fetching history data good line 106")
        throw new Error("response no good")
        }
    
        const allEventsData = await response.json()
    const eventHTML = renderAllEvents(allEventsData);
    // saveSearch(searchDate, selectionTextElem, eventHTML)
  
    renderImages()
    getItToDom(eventHTML);
    
    console.log(result);
    
    // historicalEventsElem.style.display = "block"
    seeHTML(scriptHTML)
    
    
    } catch (error) {
    console.error("Error");
    }
  
  }
    // Make the getKeyWordEvent function accessible from other JS files
    // window.getKeyWordEvent = getKeyWordEvent;
  
  