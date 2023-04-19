// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the needed elements on the page
  const pastSearchesList = document.getElementById("pastSearchesList");
  const searchForm = document.getElementById("search-form");
  const showPastSearchesBtn = document.getElementById("showPastSearchesBtn");
  const pastSearchesBox = document.getElementById("pastSearchesBox");
  const pastSearchesContent = document.getElementById("pastSearchesContent");

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
    if (target.classList.contains("past-search-btn")) {
      // Get the search date from the button and perform the search
      const searchDate = target.textContent;
      document.getElementById("searchText").value = searchDate;
      getKeyWordEvent(searchDate);
      // Hide the past searches box
      pastSearchesBox.style.display = "none";
    }
  }

  // Save a new search to local storage
  function saveSearch(searchDate) {
    // Get past searches or default to an empty array
    const pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
    // Only save the search if it's not already in the list
    if (!pastSearches.includes(searchDate)) {
      pastSearches.push(searchDate);
      localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
      // Update the past searches list
      loadPastSearches();
    }
  }

  // Listen for the search form submission
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the search date and save it to local storage
    const searchDate = event.target.elements.searchText.value;
    saveSearch(searchDate);
    // Perform the search
    getKeyWordEvent(searchDate);
  });

  // Listen for clicks on past search buttons
  pastSearchesContent.addEventListener("click", handlePastSearchClick);
  // Load the past searches when the page loads
  loadPastSearches();

  // Show the past searches box when the button is clicked
  showPastSearchesBtn.addEventListener("click", () => {
    pastSearchesBox.style.display = "block";
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
