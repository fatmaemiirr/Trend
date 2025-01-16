const url = 'https://moviesverse1.p.rapidapi.com/celebrities-born-today';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'moviesverse1.p.rapidapi.com',
  },
};

// Fetch data from the API
async function fetchActors() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Gelen Veri:', data); // Log data for debugging
    displayActors(data.list); // Use the 'list' array
  } catch (error) {
    console.error('Hata:', error);
    document.querySelector('#actors-container').innerHTML =
      '<p class="text-red-500">Aktörler yüklenirken bir hata oluştu.</p>';
  }
}

// Display actors on the page
function displayActors(actors) {
  const container = document.querySelector('#actors-container');
  container.innerHTML = ''; // Clear previous content

  if (actors && actors.length > 0) {
    actors.forEach((actor) => {
      const actorCard = `
        <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
          <!-- Actor Image -->
          <img src="${actor.image || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${actor.name || 'Unknown Actor'}" 
               class="w-full h-48 object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-50 transition-opacity duration-500"></div>

          <!-- Actor Info -->
          <div class="absolute bottom-4 left-4 right-4 px-4 py-2 text-white">
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${actor.name || 'Unknown Actor'}
            </h3>
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey"">
              ${actor.categories ? actor.categories.join(', ') : 'No categories'}
            </p>

           
            ${actor.link ? `<a href="${actor.link}" target="_blank" class="text-gega-melon underline text-l opacity-0 group-hover:opacity-100 duration-500">IMDb Profile</a>` : ''}
          </div>
        </div>
      `;
      container.innerHTML += actorCard;
    });
  } else {
    container.innerHTML =
      '<p class="text-gray-500">No actors available to display.</p>';
  }
}

// Fetch actors when the page loads
document.addEventListener('DOMContentLoaded', fetchActors);