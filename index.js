// Vérifie que le bouton existe avant d'ajouter un événement
const submit = document.getElementById("submit");
const recipeMovies = document.getElementById("movieList");
const detail=document.getElementById("detail");
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
    movies.forEach((movie, index) => { 
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <div class="card">
                <a href="detail.html" onclick="selectmovie(${index})"><img src="${movie.img}" > </a>
            </div>
            <h3>${movie.nom}</h3>
        `;
        recipeMovies.appendChild(movieItem);
    });
     
}
document.addEventListener("DOMContentLoaded", renderMovies);


function selectmovie(index) {
    const selectedFilm = datamovie[index];
    localStorage.setItem("selectedfilm", JSON.stringify(selectedFilm));
}

 function showDetails() {

    let selectedFilm = JSON.parse(localStorage.getItem("selectedfilm"));
     console.log(selectedFilm)

    let selectedItem = document.createElement("div");
    selectedItem.classList.add("selected");
        
        selectedItem.innerHTML = `
           
        <div class="details">
               <img src="${selectedFilm.img}" >
               <div>
                <h1>${selectedFilm.nom}</h1>
                <p>Année: ${selectedFilm.annee}</p>
                <p>Réalisateur: ${selectedFilm.realisateur}</p>
                <p>Genre: ${selectedFilm.genre}</p>
                <p>Status: ${selectedFilm.status}</p>
               <button>Update</button>
               <button>Delete</button>
            </div>
        </div>
        `;
        detail.appendChild(selectedItem);

};
document.addEventListener("DOMContentLoaded", showDetails);

 

  
