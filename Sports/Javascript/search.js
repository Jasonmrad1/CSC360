const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search');
const searchField = document.querySelector('.search-field');

let expanded = false;

// Show the search field after the page is loaded
window.addEventListener('load', () => {
  searchField.style.visibility = 'visible';
  searchField.style.opacity = '1';
});

searchBtn.addEventListener('click', () => {
  if (!expanded) { 
    
    if(window.innerWidth<1100){
      searchField.style.width='170px';
      search.style.width = '130px'; // Expand the input

      

    }
    else{
    // Expand the search bar
    search.style.width = '150px'; // Expand the input

  
    searchField.style.width = '200px'; // Expand the container
    }
    searchField.style.backgroundColor = 'white';
search.style.padding = '7px';
    search.focus(); // Focus on input
    expanded = true;
  } else {
    collapseSearchBar();
  }
});

// Collapse the search bar
function collapseSearchBar() {
  search.style.width = '0';
  search.style.padding = '0';
  searchField.style.width = '50px'; // Collapse container width
  searchField.style.backgroundColor = 'transparent';

  search.value = ''; // Clear input
  expanded = false;
}

// Close the search bar on pressing Escape
search.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    collapseSearchBar();
  }
});

// Collapse on blur
search.addEventListener('blur', () => {
  if (expanded) {
    collapseSearchBar();
  }
});