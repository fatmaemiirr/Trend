const url =
  'https://tvshow.p.rapidapi.com/Movie?Page=1&Language=en-US&Adult=true&InitialDate=2024-11-01&FinalDate=2024-11-30';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'tvshow.p.rapidapi.com',
  },
};

// API'den veri al  // Fetch data from the API
async function fetchMovies() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Gelen Veri:', data); // Debugging için verileri konsola yazdır
    displayMovies(data); // Gelen veriler bir dizi formatında olduğu için doğrudan data gönderiliyor
  } catch (error) {
    console.error('Hata:', error);
    document.querySelector('#movies-container').innerHTML =
      '<p class="text-red-500">Filmler yüklenirken bir hata oluştu.</p>';
  }
}

// Sayfada filmleri görüntüle // Display movies on the page
function displayMovies(movies) {
  const container = document.querySelector('#movies-container');
  container.innerHTML = ''; // Önceki içeriği temizle

  if (movies && movies.length > 0) {
    movies.forEach((movie) => {
      const movieCard = `
        <div class="group relative overflow-hidden basis-1/3 md:basis-1/4 lg:basis-1/3 bg-black shadow-lg rounded-lg">
          <!-- Görsel -->
          <img src="${movie.image || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${movie.title || 'Unknown Movie'}" 
               class="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">

          <!-- Bilgi Detay Konteyneri -->
          <div class="absolute px-6 bottom-8">
            <!-- İsim -->
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${movie.title || 'Unknown Movie'}
            </h3>
            <!-- Tarih -->
            <p class="text-xs opacity-0 group-hover:opacity-100 group-hover:mb-10 duration-500 text-gega-grey">
              ${movie.releaseDate || 'No release date available'}
            </p>

            <!-- Linkler ve İkonlar -->

            <p class="text-s opacity-0 group-hover:opacity-100 group-hover:mb-10 duration-500 text-gega-grey"> İMDB: 
              ${movie.voteAverage || 'No release date available'}
           </p>

            
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

// Sayfa yüklendiğinde filmleri getir // Fetch movies when the page loads
document.addEventListener('DOMContentLoaded', fetchMovies);
