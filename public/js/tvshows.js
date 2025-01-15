const url = 'https://movies-tv-shows-database.p.rapidapi.com/?page=1';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'movies-tv-shows-database.p.rapidapi.com',
    Type: 'get-trending-shows',
  },
};

// TV Şovlarını çekmek için fonksiyon
async function fetchTvShows() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    displayTvShows(data.results); // Gelen şovları ekrana göstermek için bir fonksiyon çağrılır
  } catch (error) {
    console.error('Hata:', error);
    document.querySelector('#tvshows-container').innerHTML =
      '<p class="text-red-500">TV Şovları yüklenirken bir hata oluştu.</p>';
  }
}

// TV Şovlarını ekrana göstermek için bir fonksiyon
function displayTvShows(tvShows) {
  const container = document.querySelector('#tvshows-container');
  container.innerHTML = ''; // Önceki içerikleri temizle

  if (tvShows && tvShows.length > 0) {
    tvShows.forEach((show) => {
      const tvShowCard = `
        <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
          <!-- TV Şovu Görseli (Görsel yoksa alternatif bir URL kullan) -->
          <img src="https://picsum.photos/150/200?random=${Math.random()}" 
               alt="${show.title || 'Bilinmeyen TV Şovu'}" 
               class="w-full h-48 object-cover group-hover:scale-110 duration-500">
          <!-- TV Şovu Bilgileri -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-50 transition-opacity duration-500"></div>
          <div class="absolute bottom-4 left-4 right-4 px-4 py-2">
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${show.title || 'Bilinmeyen TV Şovu'}
            </h3>
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">
              ${show.year || 'Yayın tarihi bilinmiyor'}
            </p>
          </div>
        </div>
      `;
      container.innerHTML += tvShowCard;
    });
  } else {
    container.innerHTML =
      '<p class="text-gray-500">Görüntülenecek TV şovu bulunamadı.</p>';
  }
}



// Sayfa yüklendiğinde şovları getiriyoruz
document.addEventListener('DOMContentLoaded', fetchTvShows);
