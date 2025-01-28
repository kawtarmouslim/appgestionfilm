  //Cette function permet crrier un movis
  const submit=document.getElementById("submit");
 let datamovie;
 if(localStorage.movies !=null){
    datamovie=JSON.parse(localStorage.movies);
 }else{
    datamovie=[];
 }

submit.onclick = function(){
   let newmovie={
    name:document.getElementById("nom").value,
    annee:document.getElementById("annee").value,
    realisateur:document.getElementById("realisateur").value,
    genre:document.getElementById("genre").value,
    satus:document.getElementById("status").value,
   }
   datamovie.push(newmovie);
  const response =localStorage.setItem("movies",JSON.stringify(datamovie))
   console.log(datamovie);
   clairInput();
   renderMovies();
   window.location.href = "index.html"; 
   
}
// clair des input
function clairInput(){
    document.getElementById("nom").value='';
    document.getElementById("annee").value='';
    document.getElementById("realisateur").value='';
    document.getElementById("genre").value='';
    document.getElementById("status").value='';

}
//affichage 

const recipeMovies = document.getElementById("movieList");

function loadMovies() {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    if (movies.length > 0 && recipeMovies) {
        recipeMovies(movies);
    } else if (recipeMovies) {
        recipeList.innerHTML = "<p>Aucune film disponible.</p>";
    }
}

    function renderMovies() {
        recipeMovies.innerHTML =  `
                    
                <h5 style="font-size: 1.2rem; font-weight: bold; margin: 15px 0; color: #333;">${recipeMovies.nom}</h5>
            </div>
        `.join("");
    }
   

 


