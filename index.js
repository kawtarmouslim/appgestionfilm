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
               <button id="updateBtn">Update</button>
               <button id="deleteRecipeButton">Delete</button>
            </div>
        </div>
        `;
        detail.appendChild(selectedItem);

        const deleteButton = document.getElementById("deleteRecipeButton");
        deleteButton.addEventListener("click", function () {
            deleteMovie(selectedFilm.nom);
        });
         
        const updateButton = document.getElementById("updateBtn");
    updateButton.addEventListener("click", function () {
        showUpdateForm(selectedFilm);  // Afficher le formulaire de mise à jour
    });

};
document.addEventListener("DOMContentLoaded", showDetails);

function showUpdateForm(film) {
    const detail = document.getElementById("detail");
    detail.innerHTML = `
        <h2>Modifier le Film</h2>
        <form id="updateForm">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" value="${film.nom}" required>
            
            <label for="annee">Année:</label>
            <input type="text" id="annee" value="${film.annee}" required>
            
            <label for="realisateur">Réalisateur:</label>
            <input type="text" id="realisateur" value="${film.realisateur}" required>
            
            <label for="genre">Genre:</label>
            <input type="text" id="genre" value="${film.genre}" required>
            
            <label for="status">Status:</label>
            <input type="text" id="status" value="${film.status}" required>

            
            <button type="submit">Save Changes</button>
        </form>
    `;

    const updateForm = document.getElementById("updateForm");
    updateForm.addEventListener("submit", function (e) {
        e.preventDefault();  // Empêcher l'envoi du formulaire

        // Récupère les nouvelles valeurs
        const updatedFilm = {
            ...film,
            nom: document.getElementById("nom").value,
            annee: document.getElementById("annee").value,
            realisateur: document.getElementById("realisateur").value,
            genre: document.getElementById("genre").value,
            status: document.getElementById("status").value
        };

        console.log("Film modifié :", updatedFilm);

        // Mettre à jour les données dans localStorage
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        const index = movies.findIndex(f => f.nom === film.nom);  // Trouver le film à mettre à jour
        if (index !== -1) {
            movies[index] = updatedFilm;  // Mettre à jour le film dans le tableau
            localStorage.setItem("movies", JSON.stringify(movies));  // Sauvegarder la liste mise à jour
        }

        // Sauvegarder le film modifié dans selectedfilm
        localStorage.setItem("selectedfilm", JSON.stringify(updatedFilm));

        // Afficher un message de confirmation
        alert("Le film a été modifié avec succès !");
        
        // Recharge les détails du film modifié
       // showDetails();  // Appeler la fonction qui montre les détails après modification
       window.location.href = "index.html";

    });
}
 
function deleteMovie(movieName) {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const updatedMovies = movies.filter(movie => movie.nom !== movieName);

    if (updatedMovies.length < movies.length) {
        localStorage.setItem("movies", JSON.stringify(updatedMovies));
        localStorage.removeItem("selectedfilm");
        alert(`Le film "${movieName}" a été supprimé avec succès.`);
        window.location.href = "index.html";
    } else {
        alert(`Le film "${movieName}" est introuvable.`);
    }
}
function searchMovies() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const recipeMovies = document.getElementById("movieList");

    // Vider l'affichage précédent
    recipeMovies.innerHTML = "";

    // Filtrer les films en fonction de la recherche
    const filteredMovies = movies.filter(movie =>
        movie.nom.toLowerCase().includes(searchQuery)
    );

    if (filteredMovies.length === 0) {
        recipeMovies.innerHTML = "<p>Aucun film trouvé.</p>";
        return;
    }

    // Affichage des films filtrés
    filteredMovies.forEach((movie, index) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <div class="card">
                <a href="detail.html" onclick="selectmovie(${index})">
                    <img src="${movie.img}" alt="${movie.nom}">
                </a>
            </div>
            <h3>${movie.nom}</h3>
        `;
        recipeMovies.appendChild(movieItem);
    });
}
