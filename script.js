const img_prefix = "https://image.tmdb.org/t/p/original";

const search_prefix = "https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false"

const API_KEY = "2d578ff54b28db88d467ae4065cd2bdb";



let list_of_movies = [];

let PAGE = 1;


async function getMovies(PAGE) {
  const result = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
      API_KEY +
      "&language=en-US&page=" +
      PAGE
  );

  console.log("https://api.themoviedb.org/3/movie/now_playing?api_key=" +
  API_KEY +
  "&language=en-US&page=" +
  PAGE);
  // update page
  // console.log(PAGE)

  // PAGE++;

  data = await result.json();

  // for each movie
  for (movie of data["results"]) {
    // create movie elem container div with inner container class
    let movieElem = document.createElement("div");
    movieElem.classList.add("movie-item");
    movieElem.style.margin = '0 0 20px'

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
    movieElemImg.src = img_prefix + movie["poster_path"];
    movieElemImg.alt = movie["original_title"];

    // append poster, title, rating, break
    movieElem.appendChild(movieElemImg);
    movieElem.appendChild(movieElemTitle);
    movieElem.appendChild(movieElemRating);
    movieElem.appendChild(document.createElement("br"));

    document.getElementById("movies").appendChild(movieElem);


  }

  // add listener to all images
  document.images.forEach(img => {
    img.addEventListener('click', handleImageClick)
  });
}

async function listMovies() {
  try {
    const response = await getMovies(PAGE);
    PAGE++;

    // getMovies(PAGE)

    document
      .getElementById("loadmore")
      .addEventListener("click", async function () {
        await getMovies(PAGE);
        PAGE++;
      });
  } catch (err) {
    console.log(err);
  }
}

async function handleSearchQuery(inputStr){
  
  // if search not empty
  if(inputStr){
    console.log('hi');
    // hide regular movies
    document.getElementById('movies').style.display ='none'

    // clear prev search movies
    document.getElementById('searchmovies').innerHTML = ''
    // search for movie

    // https://api.themoviedb.org/3/search/movie?api_key=2d578ff54b28db88d467ae4065cd2bdb&language=en-US&query=Wrath%20of%20man&page=1&include_adult=false
    const res = await fetch(
      search_prefix +
      "&query=" +
      inputStr.replace(' ', '%20') +
      "&api_key=" +
      API_KEY
    )
    data = await res.json()

    const results = data['results']



    for(movie of results) {
      let movieElem = document.createElement('div')
      movieElem.style.margin = '0 0 20px'
      movieElem.classList.add("movie-item")
      movieElem.classList.add("movies")

      movieElem.innerHTML += `
        <img src="${img_prefix + movie['poster_path']}" alt="${movie['original_title']}">
        <p style="text-align: center; margin: 0">
        ${movie['original_title']}
        </p>
        <p style="text-align: center; margin: 0">
        ${"⭐" + movie["vote_average"]}
        </p>
      `

      console.log(
        `
        <p style="text-align: center; margin: 0">
        ${movie['original_title']}
        </p>
        <p style="text-align: center; margin: 0">
        ${"⭐" + movie["vote_average"]}
        </p>
        <img src="${img_prefix + movie['poster_path']}" alt="${movie['original_title']}">
      `
      );
      

      document.getElementById('searchmovies').appendChild(movieElem)
    }
    
  }
  // else empty
  else{
    document.getElementById('movies').style.display ='flex'
  }
}

function handleImageClick(){

}

window.onload = function() {


  listMovies();

  let input = document.querySelector('.search input')
  input.addEventListener('input', () => {
    
    handleSearchQuery(input.value)
  })

  

}


// getMovies(PAGE)
