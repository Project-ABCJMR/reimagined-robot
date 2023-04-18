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
            if (record.images && record.images[0] && record.images[0].baseimageurl && record.title ) {
                console.log(record.images[0].baseimageurl)
                const imgURL = record.images[0].baseimageurl
                const imgTitle = record.title
                imgs.push( {imgURL, imgTitle} )
                console.log(imgs)
  
            }   else if (!record.images || !record.images[0] || !record.images[0].baseimageurl) {
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
            const displayedImg = imgs[currentPage-1].imgURL;
            const imgElemHTML = `<img src="${displayedImg}">`;
            const displayedImgTitle = imgs[currentPage-1].imgTitle
            imgTitleElem.innerHTML = displayedImgTitle
            console.log(displayedImg)
            imgElem.innerHTML = imgElemHTML
            console.log(currentPage)
  
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

    renderImages()

    } catch (error) {
    console.error('Error rendering images', error.message)
    }

    try {
        seeHTML(scriptHTML)
    }   catch (error) {
        console.error("error", error.message)
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
    saveSearch(searchDate, selectionTextElem, eventHTML)

    
    getItToDom(eventHTML);

    
    
    console.log(result);
    
    historicalEventsElem.style.display = "block"

    
    
    } catch (error) {
    console.error("Error");
    }

    

}