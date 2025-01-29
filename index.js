
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
            clairInput();
            renderMovies();
            window.location.href = "index.html";
        };

        reader.readAsDataURL(imgInput.files[0]);
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
          <div style="width: 100%; max-width: 300px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background-color: #fff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                 <h3>${movie.nom}</h3>
                ${movie.img ? `<img src="${movie.img}" alt="Affiche du film" style="width: 150px; height: auto; border-radius: 10px;">` : ""}
          </div>
        `;
        recipeMovies.appendChild(movieItem);
    });  
}
// Charge les films au chargement de la page:
document.addEventListener("DOMContentLoaded", renderMovies);
  
