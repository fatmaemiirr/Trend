const url = 'https://moviesdatabase.p.rapidapi.com/titles';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
  },
};

// Filmleri çekmek için bir fonksiyon tanımlıyoruz
async function fetchMovies() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    displayMovies(data.results); // Gelen filmleri ekrana göstermek için bir fonksiyon çağrılır
  } catch (error) {
    console.error('Hata:', error);
    document.querySelector('#movies-container').innerHTML =
      '<p class="text-red-500">Filmler yüklenirken bir hata oluştu.</p>';
  }
}

// Filmleri ekrana göstermek için bir fonksiyon
function displayMovies(movies) {
  const container = document.querySelector('#movies-container');
  container.innerHTML = ''; // Önceki içerikleri temizliyoruz

  if (movies && movies.length > 0) {
    movies.forEach((movie) => {
      const movieCard = `
        <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
          <!-- Film Görseli -->
          <img src="${movie.primaryImage?.url || `https://picsum.photos/150/200?random=${Math.random()}`}" 
               alt="${movie.titleText?.text || 'Bilinmeyen Başlık'}" 
               class="w-full h-48 object-cover group-hover:scale-110 duration-500">
          <!-- Film Bilgileri -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-50 transition-opacity duration-500"></div>
          <div class="absolute bottom-4 left-4 right-4 px-4 py-2">
            <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
              ${movie.titleText?.text || 'Bilinmeyen Başlık'}
            </h3>
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">
              ${movie.releaseYear?.year || 'Yayın tarihi bilinmiyor'}
            </p>
          </div>
        </div>
      `;
      container.innerHTML += movieCard;
    });
  } else {
    container.innerHTML =
      '<p class="text-gray-500">Görüntülenecek film bulunamadı.</p>';
  }
}

// Sayfa yüklendiğinde filmleri getiriyoruz
document.addEventListener('DOMContentLoaded', fetchMovies);
