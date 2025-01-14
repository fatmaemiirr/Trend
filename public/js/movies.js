// movies.js
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
        <div class="bg-white shadow-md rounded p-4 w-full md:w-1/2 lg:w-1/3">
          <h3 class="font-bold text-lg">${movie.primaryTitle || 'Bilinmeyen Başlık'}</h3>
          <p class="text-gray-700">Yıl: ${movie.startYear || 'Bilinmiyor'}</p>
          <p class="text-gray-700">Tür: ${movie.genres ? movie.genres.join(', ') : 'Bilinmiyor'}</p>
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
