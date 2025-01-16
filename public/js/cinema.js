const url = 'https://film-chase1.p.rapidapi.com/cinemas?page=1&items=20';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'film-chase1.p.rapidapi.com',
  },
};

// API'den veri çekme
async function fetchCinemas() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Gelen Veri:', data); // Veriyi konsolda inceleyin
    displayCinemas(data); // Gelen veriyi ekrana gönder
  } catch (error) {
    console.error('Hata:', error);
    document.querySelector('#cinemas-container').innerHTML =
      '<p class="text-red-500">Sinemalar yüklenirken bir hata oluştu.</p>';
  }
}

// Sayfa yüklendiğinde sinemaları getir
document.addEventListener('DOMContentLoaded', fetchCinemas);


// Sinema bilgilerini ekrana yazdırma
function displayCinemas(cinemas) {
    const container = document.querySelector('#cinemas-container');
    container.innerHTML = ''; // Önceki içerikleri temizle
  
    if (cinemas && cinemas.length > 0) {
      cinemas.forEach((cinema) => {
        const cinemaCard = `
          <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
            <!-- Sinema Adı -->
            <h3 class="text-gega-grey group-hover:text-gega-red group-hover:mb-2 duration-500">
              ${cinema.name || 'Bilinmeyen Sinema'}
            </h3>
            <!-- Adres -->
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">
              Adres: ${cinema.address || 'Bilinmiyor'}
            </p>
            <!-- Harita Linki -->
            <a href="https://www.google.com/maps?q=${cinema.latitude},${cinema.longitude}" 
               target="_blank" class="text-gega-melon">
              See on Map
            </a>
          </div>
        `;
        container.innerHTML += cinemaCard;
      });
    } else {
      container.innerHTML =
        '<p class="text-gray-500">Görüntülenecek sinema bulunamadı.</p>';
    }
  }
  

// Sayfa yüklendiğinde sinema verilerini getir
document.addEventListener('DOMContentLoaded', fetchCinemas);
