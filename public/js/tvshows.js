const url = 'https://moviesverse1.p.rapidapi.com/current-popular-tv-shows';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'moviesverse1.p.rapidapi.com',
  },
};

// API'den veri çekme // Fetch data from the API
async function fetchTVShows() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Gelen Veri:', data); // Debugging için veriyi konsola yazdır
    displayTVShows(data.list); // API'den gelen 'list' dizisini işliyoruz
  } catch (error) {
    console.error('Hata:', error);
    document.querySelector('#tvshows-container').innerHTML =
      '<p class="text-red-500">TV şovları yüklenirken bir hata oluştu.</p>';
  }
}

 // Sayfadaki dizileri görüntüle // Display TV shows on the page
function displayTVShows(tvshows) {
  const container = document.querySelector('#tvshows-container');
  container.innerHTML = ''; // Önceki içeriği temizle

  if (tvshows && tvshows.length > 0) {
    tvshows.forEach((show) => {
      const tvShowCard = `
        <div class="group relative overflow-hidden basis-1/3 md:basis-1/4 lg:basis-1/3 bg-black shadow-lg rounded-lg">
          <!-- Görsel -->
          <img src="${show.image || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${show.title || 'Unknown TV Show'}" 
               class="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">

          <!-- Bilgi Detay Konteyneri -->
          <div class="absolute px-6 bottom-8">
            <!-- Başlık -->
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${show.title || 'Unknown TV Show'}
            </h3>
            
            <!-- Yayın Zamanı ve Bölüm Bilgisi -->
            <p class="text-xs opacity-0 group-hover:opacity-100 group-hover:mb-10 duration-500 text-gega-grey">
              ${show.timeline || 'Timeline not available'} - ${show.totalEpisodes || 'Episode count not available'}
            </p>

            <!-- IMDb Puanı -->
            <p class="text-s opacity-0 group-hover:opacity-100 group-hover:mb-2 duration-500 text-gega-grey">
              IMDb Rating: ${show.imdbRating || 'N/A'}
            </p>
            
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

// Sayfa yüklendiğinde aktörleri getir  // Fetch TV shows when the page loads
document.addEventListener('DOMContentLoaded', fetchTVShows);
