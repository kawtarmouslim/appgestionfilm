// Vérifie que le bouton existe avant d'ajouter un événement
const submit = document.getElementById("submit");
const recipeMovies = document.getElementById("movieList");

let datamovie = localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : [];

if (submit) {
    submit.onclick = function () {
        let newmovie = {
            nom: document.getElementById("nom")?.value ,
            annee: document.getElementById("annee")?.value ,
            realisateur: document.getElementById("realisateur")?.value ,
            genre: document.getElementById("genre")?.value ,
            status: document.getElementById("status")?.value,
        };

        datamovie.push(newmovie);
        localStorage.setItem("movies", JSON.stringify(datamovie));
        console.log(datamovie);
        clairInput();
        renderMovies();
        window.location.href = "index.html";
    };
}


function clairInput() {
    document.getElementById("nom").value = "";
    document.getElementById("annee").value = "";
    document.getElementById("realisateur").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "";
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
            <h3>${movie.nom}</h3>
            
        `;
        recipeMovies.appendChild(movieItem);
    });
}
// Charge les films au chargement de la page:
document.addEventListener("DOMContentLoaded", renderMovies);
