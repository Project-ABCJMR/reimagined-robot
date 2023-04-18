// Main function to fetch and display images and events based on the search date
async function getKeyWordEvent(searchDate) {
    // ... (the original getKeyWordEvent code)
  }
  
  // Save a search to local storage
  function saveSearch(searchDate) {
    // Get past searches from local storage, or create an empty array if it doesn't exist
    const pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
  
    // Add the new search date to the past searches array
    pastSearches.push(searchDate);
  
    // Save the updated past searches array to local storage
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  }
  
  // Display past searches in a dropdown box
  function displayPastSearches() {
    // Get past searches from local storage
    const pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
  
    // Get the dropdown element
    const dropdown = document.getElementById('pastSearchesDropdown');
  
    // Clear the dropdown
    dropdown.innerHTML = '';
  
    // Add an option for each past search
    pastSearches.forEach((searchDate) => {
      const option = document.createElement('option');
      option.value = searchDate;
      option.textContent = searchDate;
      dropdown.appendChild(option);
    });
  }
  
  // Get the button and dropdown elements
  const pastSearchesBtn = document.getElementById('pastSearchesBtn');
  const pastSearchesDropdown = document.getElementById('pastSearchesDropdown');
  
  // Add a click event listener to the button to display past searches in the dropdown
  pastSearchesBtn.addEventListener('click', () => {
    displayPastSearches();
    pastSearchesDropdown.style.display = 'block';
  });
  
  // Add a change event listener to the dropdown to load data for the selected search
  pastSearchesDropdown.addEventListener('change', (event) => {
    const selectedSearch = event.target.value;
    if (selectedSearch) {
      getKeyWordEvent(selectedSearch);
    }
  });
  
  // Make the getKeyWordEvent function accessible from other JS files
  window.getKeyWordEvent = getKeyWordEvent;
  