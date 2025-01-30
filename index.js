// Vérifie que le bouton existe avant d'ajouter un événement
const submit = document.getElementById("submit");
const recipeMovies = document.getElementById("movieList");
let datamovie = localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : [];

if (submit) {
    submit.onclick = function () {
        const imgInput = document.getElementById("img");
        const reader = new FileReader();
        reader.onload = function (e) {
            let newmovie = {
                nom: document.getElementById("nom")?.value,
                annee: document.getElementById("annee")?.value,
                realisateur: document.getElementById("realisateur")?.value,
                genre: document.getElementById("genre")?.value,
                status: document.getElementById("status")?.value,
                img: e.target.result,//result est utilisé pour accéder aux données(comme l'ecture d'un fichiet)
            };
            datamovie.push(newmovie);
            localStorage.setItem("movies", JSON.stringify(datamovie));
           
            renderMovies();
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imgInput.files[0]);
    };
}


function renderMovies() {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    if (!recipeMovies)
         return;
    
    if (movies.length === 0) {
        recipeMovies.innerHTML = "<p>Aucun film disponible.</p>";
        return;
    }
    movies.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
        <div class="card">
         
         <a href="detail.html" ><img src="${movie.img}" > </a>
         </div>
           <h3>${movie.nom}</h3>
        `;
        recipeMovies.appendChild(movieItem);
    });  
}
document.addEventListener("DOMContentLoaded", renderMovies);
  
