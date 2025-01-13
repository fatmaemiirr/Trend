document.addEventListener("DOMContentLoaded", () => {
    const movieGrid = document.getElementById("movieGrid");
    const detailsPanel = document.getElementById("movieDetails");
    const closeDetailsBtn = document.getElementById("closeDetails");
    const detailImage = document.getElementById("detailImage");
    const detailTitle = document.getElementById("detailTitle");
    const detailYear = document.getElementById("detailYear");
    const detailDescription = document.getElementById("detailDescription");

    const API_URL = "https://moviesdatabase.p.rapidapi.com/titles";
    const API_HEADERS = {
        "x-rapidapi-key": "27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3",
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    };

    // Film verilerini çek
    const fetchMovies = async () => {
        try {
            const response = await fetch(API_URL, { method: "GET", headers: API_HEADERS });
            if (!response.ok) throw new Error(`API Hatası: ${response.statusText}`);
            const data = await response.json();
            renderMovies(data.results);
        } catch (error) {
            console.error("Film verilerini yüklerken hata oluştu:", error);
        }
    };

    // Filmleri ekrana render et
    const renderMovies = (movies) => {
        if (!movies || movies.length === 0) {
            movieGrid.innerHTML = `<p class="text-center text-white">Film bulunamadı.</p>`;
            return;
        }

        movies.forEach((movie) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add(
                "movie",
                "bg-gray-800",
                "text-white",
                "rounded-lg",
                "overflow-hidden",
                "shadow-md",
                "cursor-pointer",
                "transition-transform",
                "hover:scale-105",
                "relative"
            );

            const movieImage = document.createElement("img");
            movieImage.src = movie.primaryImage?.url || `https://picsum.photos/300/400?random=${Math.random()}`;
            movieImage.alt = movie.titleText?.text || "Film Başlığı";
            movieImage.classList.add("w-full", "h-72", "object-cover");

            const movieOverlay = document.createElement("div");
            movieOverlay.classList.add(
                "absolute",
                "inset-0",
                "bg-black",
                "bg-opacity-50",
                "opacity-0",
                "hover:opacity-100",
                "transition-opacity",
                "flex",
                "items-center",
                "justify-center",
                "text-center",
                "text-white",
                "font-semibold",
                "text-lg"
            );
            movieOverlay.textContent = movie.titleText?.text || "Başlık Yok";

            movieDiv.appendChild(movieImage);
            movieDiv.appendChild(movieOverlay);

            // Tıklandığında detay ekranını aç
            movieDiv.addEventListener("click", () => {
                detailsPanel.classList.remove("hidden");
                detailImage.src = movie.primaryImage?.url || `https://picsum.photos/400/300?random=${Math.random()}`;
                detailTitle.textContent = movie.titleText?.text || "Başlık Yok";
                detailYear.textContent = `Yayın Yılı: ${movie.releaseYear?.year || "Bilinmiyor"}`;
                detailDescription.textContent = movie.plot?.plotText?.plainText || "Açıklama yok.";
            });

            movieGrid.appendChild(movieDiv);
        });
    };

    // Detay panelini kapatma
    closeDetailsBtn.addEventListener("click", () => {
        detailsPanel.classList.add("hidden");
    });

    fetchMovies();
});