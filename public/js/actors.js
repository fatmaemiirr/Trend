const url = 'https://moviesverse1.p.rapidapi.com/celebrities-born-today';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'moviesverse1.p.rapidapi.com',
  },
};

// API'den veri al  // Fetch data from the API

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

 // Sayfadaki aktörleri görüntüle // Display actors on the
function displayActors(actors) {
  const container = document.querySelector('#actors-container');
  container.innerHTML = ''; // Önceki içeriği temizle

  if (actors && actors.length > 0) {
    actors.forEach((actor) => {
      const actorCard = `
        <div class="group relative overflow-hidden basis-1/3 md:basis-1/4 lg:basis-1/3 bg-black shadow-lg rounded-lg">
          <!-- Görsel -->
          <img src="${actor.image || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${actor.name || 'Unknown Actor'}" 
               class="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">

          <!-- Bilgi Detay Konteyneri -->
          <div class="absolute px-6 bottom-8">
            <!-- İsim -->
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${actor.name || 'Unknown Actor'}
            </h3>
            <!-- Açıklama -->
            <p class="text-xs opacity-0 group-hover:opacity-100 group-hover:mb-10 duration-500 text-gega-grey">
              ${actor.categories ? actor.categories.join(', ') : 'No categories'}
            </p>

            <!-- Linkler ve İkonlar -->
            <div
              class="absolute flex space-x-8 text-gega-grey opacity-0 -bottom-2 group-hover:bottom-2 group-hover:opacity-100 duration-500">
              ${
                actor.link
                  ? `<a href="${actor.link}" target="_blank" class="hover:text-gega-red">
                       <i class="fa-solid fa-play"></i>
                     </a>`
                  : ''
              }
            </div>
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


// Sayfa yüklendiğinde aktörleri getir // Fetch actors when the page loads
document.addEventListener('DOMContentLoaded', fetchActors);