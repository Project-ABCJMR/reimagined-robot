// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the needed elements on the page
  const pastSearchesList = document.getElementById("pastSearchesList");
  const searchForm = document.getElementById("search-form");
  const showPastSearchesBtn = document.getElementById("showPastSearchesBtn");
  const pastSearchesBox = document.getElementById("pastSearchesBox");
  const pastSearchesContent = document.getElementById("pastSearchesContent");
  const form = document.querySelector('form')
  const searchText = document.getElementById('searchText');

  // Load past searches from local storage and display them as buttons
  function loadPastSearches() {
    // Get past searches or default to an empty array
    const pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
    // Create past search buttons and add them to the past searches content
    
    pastSearchesContent.innerHTML = pastSearches
      .map((search) => `<button class="button past-search-btn">${search}</button>`)
      .join("");
  }
  
  // Handle clicking on a past search button
  function handlePastSearchClick(event) {
    // Check if the clicked element is a past search button
    const target = event.target;
    console.log(target, "load searchhistory click")
    if (target.classList.contains("past-search-btn")) {
      // Get the search date from the button and perform the search
      const searchDate = target.textContent;
      document.getElementById("searchText").value = searchDate;
      getKeyWordEvent(searchDate);
      // Hide the past searches box
      pastSearchesBox.style.display = "none";
    }
  }


  // Listen for the search form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("getKeyword being called from past searches")
    // Get the search date and save it to local storage
    const searchDate = event.target.elements.searchText.value;
    savePastSearch(searchDate);
    // Perform the search
    
  });

  // Listen for clicks on past search buttons
  pastSearchesContent.addEventListener("click", handlePastSearchClick); 
  // Load the past searches when the page loads
  loadPastSearches();

  // Show the past searches box when the button is clicked
  showPastSearchesBtn.addEventListener("click", () => {
    pastSearchesBox.style.display = "block";
    console.log( "previous searches btn clicked")
  });

  // Hide the past searches box when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !pastSearchesBox.contains(event.target) &&
      event.target !== showPastSearchesBtn
    ) {
      pastSearchesBox.style.display = "none";
    }
  });
});
window.getKeyWordEvent = getKeyWordEvent;