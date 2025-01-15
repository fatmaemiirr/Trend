const url = 'https://moviesdatabase.p.rapidapi.com/actors';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3',
    'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
  },
};

// Aktör verilerini çek ve ekrana yazdır
async function fetchActors() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    // API verisinden aktör listesi alınır
    const actors = data.results;

    // Aktörleri ekrana yazdır
    displayActors(actors);
  } catch (error) {
    console.error('API hatası:', error);
  }
}

// Aktörleri ekrana yazdıran fonksiyon
function displayActors(actors) {
  const container = document.getElementById('actors-container');
  container.innerHTML = ''; // Mevcut içeriği temizle

  actors.forEach((actor) => {
    const actorCard = `
      <div class="group relative overflow-hidden bg-black shadow-lg rounded-lg">
        <!-- Aktör Görseli -->
        <img src="${actor.primaryImage?.url || `https://picsum.photos/150/200?random=${Math.random()}`}" alt="${actor.primaryName}"
          class="w-full h-48 object-cover group-hover:scale-110 group-hover:opacity-50 duration-500">
        <!-- Aktör Bilgileri -->
        <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black via-transparent to-transparent">
          <h3 class="text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
            ${actor.
                primaryName
                 || 'Unknown Actor'}
          </h3>
          <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">Doğum Yılı:
            ${actor.birthYear || 'Doğum tarihi bilinmiyor'}
            <p class="text-xs opacity-0 group-hover:opacity-100 duration-500 text-gega-grey">Ölüm Yılı:
            ${actor.deathYear || 'Doğum tarihi bilinmiyor'}</p>
        </div>
      </div>
    `;
    container.innerHTML += actorCard;
  });
}

// Sayfa yüklendiğinde API'yi çağır
document.addEventListener('DOMContentLoaded', fetchActors);
