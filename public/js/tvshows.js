// JavaScript Section
const url = 'https://imdb236.p.rapidapi.com/imdb/top250-tv';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

let allTVShows = [];
let displayedTVShows = [];
const initialCount = 20;

// Fetch data from the API
async function fetchTVShows() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received Data:', data); // Log data for debugging
    allTVShows = data;
    displayedTVShows = allTVShows.slice(0, initialCount);
    displayTVShows(displayedTVShows);
  } catch (error) {
    console.error('Error:', error);
    document.querySelector('#tvshows-container').innerHTML =
      '<p class="text-red-500">An error occurred while loading TV shows.</p>';
  }
}

// Display TV shows on the page
function displayTVShows(tvShows) {
  const container = document.querySelector('#tvshows-container');
  container.innerHTML = ''; // Clear previous content

  if (tvShows && tvShows.length > 0) {
    tvShows.forEach((tvShow) => {
      const tvShowCard = `
        <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
          <!-- TV Show Image -->
          <img src="${tvShow.primaryImage || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${tvShow.title || 'Unknown TV Show'}" 
               class="w-full h-48 object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-50 transition-opacity duration-500"></div>

          <!-- TV Show Info -->
          <div class="absolute bottom-4 left-4 right-4 px-4 py-2 text-white">
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${tvShow.title || 'Unknown TV Show'}
            </h3>
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">
              Rating: ${tvShow.averageRating || 'N/A'}
            </p>

            ${tvShow.link ? `<a href="${tvShow.link}" target="_blank" class="text-gega-melon underline text-l opacity-0 group-hover:opacity-100 duration-500">More Info</a>` : ''}
          </div>
        </div>
      `;
      container.innerHTML += tvShowCard;
    });
  } else {
    container.innerHTML =
      '<p class="text-gray-500">No TV shows available to display.</p>';
  }
}

// Show more TV shows on button click
document.querySelector('#show-more-tv').addEventListener('click', () => {
  displayedTVShows = allTVShows;
  displayTVShows(displayedTVShows);
  document.querySelector('#show-more-tv').style.display = 'none';
});

// Fetch TV shows when the page loads
document.addEventListener('DOMContentLoaded', fetchTVShows);