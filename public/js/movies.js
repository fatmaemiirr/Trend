// JavaScript Section
const url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

let allMovies = [];
let displayedMovies = [];
const initialCount = 20;

// Fetch data from the API
async function fetchMovies() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received Data:', data); // Log data for debugging
    allMovies = data;
    displayedMovies = allMovies.slice(0, initialCount);
    displayMovies(displayedMovies);
  } catch (error) {
    console.error('Error:', error);
    document.querySelector('#movies-container').innerHTML =
      '<p class="text-red-500">An error occurred while loading movies.</p>';
  }
}

// Display movies on the page
function displayMovies(movies) {
  const container = document.querySelector('#movies-container');
  container.innerHTML = ''; // Clear previous content

  if (movies && movies.length > 0) {
    movies.forEach((movie) => {
      const movieCard = `
        <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
          <!-- Movie Image -->
          <img src="${movie.primaryImage || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${movie.title || 'Unknown Movie'}" 
               class="w-full h-48 object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-50 transition-opacity duration-500"></div>

          <!-- Movie Info -->
          <div class="absolute bottom-4 left-4 right-4 px-4 py-2 text-white">
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${movie.title || 'Unknown Movie'}
            </h3>
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">
              Rating: ${movie.averageRating
                || 'N/A'}
            </p>

            ${movie.link ? `<a href="${movie.link}" target="_blank" class="text-gega-melon underline text-l opacity-0 group-hover:opacity-100 duration-500">More Info</a>` : ''}
          </div>
        </div>
      `;
      container.innerHTML += movieCard;
    });
  } else {
    container.innerHTML =
      '<p class="text-gray-500">No movies available to display.</p>';
  }
}

// Show more movies on button click
document.querySelector('#show-more').addEventListener('click', () => {
  displayedMovies = allMovies;
  displayMovies(displayedMovies);
  document.querySelector('#show-more').style.display = 'none';
});

// Fetch movies when the page loads
document.addEventListener('DOMContentLoaded', fetchMovies);
