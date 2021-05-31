const img_prefix = "https://image.tmdb.org/t/p/original";
const API_KEY = "2d578ff54b28db88d467ae4065cd2bdb";

let list_of_movies = [];

window.onload = function () {
  const result = fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
      API_KEY +
      "&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // for each movie
      for (movie of data["results"]) {
        // create movie elem container div with inner container class
        let movieElem = document.createElement("div");
        movieElem.classList.add("movie-item");

        // create title
        let movieElemTitle = document.createElement("p");
        movieElemTitle.style.textAlign = "center";
        movieElemTitle.innerHTML = movie["original_title"];
        movieElemTitle.style.margin = 0;

        // create rating
        let movieElemRating = document.createElement("p");
        movieElemRating.style.textAlign = "center";
        movieElemRating.innerHTML = "⭐" + movie["vote_average"];
        movieElemRating.style.margin = 0;

        // create movie element to be added to dom
        let movieElemImg = document.createElement("img");
        movieElemImg.src = img_prefix + movie["backdrop_path"];
        movieElemImg.alt = movie["original_title"];

        // append poster, title, rating, break
        movieElem.appendChild(movieElemImg);
        movieElem.appendChild(movieElemTitle);
        movieElem.appendChild(movieElemRating);
        movieElem.appendChild(document.createElement("br"));

        document.getElementById("movies").appendChild(movieElem);
        // list_of_movies.push(movieElem)

        // console.log(movieElem);
      }
    })
    .catch((error) => console.log(error));
};

// for(el of list_of_movies){
//   console.log(el)
// }
// console.log('h:')
// console.log(list_of_movies)