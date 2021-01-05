const findMovies = (movieSearched) => {
  let movies = [];
  let markup = "";
  axios
    .get(`http://www.omdbapi.com/?apikey=24812b9d&s=${movieSearched}`)
    .then((response) => {
      if (response.data.Response === "True") {
        movies = response.data.Search;

        movies.map((movie) => {
          if (movie.Type === "movie") {
            if (movie.Poster === "N/A") {
              movie.Poster = "./images/no-poster.jpg";
            }
            markup += `
          <div class="card text-white bg-light" style="max-width: 25rem">
            <div class="card-body">
            <p class="text-info">${movie.Year}</p>
              <div style="text-align: center; margin-bottom: 20px;">
                <img
                  id="${movie.imdbID}"
                  class="img-fluid"
                  src="${movie.Poster}"
                  alt="movie poster"
                />
                </div>
                <h5 class="card-title text-primary">${movie.Title} </h5>
                <div id="details"></div>
              </div>
          </div>
            `;
          }
        });
      }

      document.getElementById("movie-cards").innerHTML = markup;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getMovieDetails = (movieID) => {
  let movieDetails = [];
  let markup = "";
  axios
    .get(`http://www.omdbapi.com/?apikey=24812b9d&plot=full&i=${movieID}`)
    .then((response) => {
      if (response.data.Response === "True") {
        movieDetails = response.data;
        if (movieDetails.Poster === "N/A") {
          movieDetails.Poster = "./images/no-poster.jpg";
        }
        console.log(movieDetails);
        markup += `
        <div class="card text-white w-100 bg-light mb-3">
          <div class="card-body" >
          <ul class="text-info">
            <li>${movieDetails.Year}</li>
            <li>${movieDetails.Rated}</li>
          </ul>
            <div style="text-align: center; margin-bottom: 30px;">
            <img
              class="img-fluid"
              src="${movieDetails.Poster}"
              alt="movie poster"
            />
            </div>
            <h5 class="card-title text-primary">${movieDetails.Title}</h5>
            <hr class="my-1 bg-info" />
            <p class="text-success">Rotten Tomatoes Rated: ${movieDetails.Ratings[1].Value}</p>
            <p class="text-success">Genre: ${movieDetails.Genre}</p>
            <p class="text-success">Directed by: ${movieDetails.Director}<br/> Starring: ${movieDetails.Actors}</p>
            <p class="text-success">${movieDetails.Plot}</p>
            <hr class="my-1 bg-info" />
          </div>
        </div>
        `;
      }

      document.getElementById("details").innerHTML = markup;
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchInput = document.getElementById("searchInput");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  findMovies(searchInput.value);
  searchInput.value = "";
});

const cards = document.getElementById("movie-cards");
const details = document.getElementById("details");
const searchBox = document.getElementById("searchForm");

cards.addEventListener("click", (e) => {
  getMovieDetails(e.target.id);

  if (e.target.id) {
    cards.classList.toggle("showDetails");
    details.classList.toggle("showDetails");
    searchBox.classList.toggle("showDetails");
  }
});

details.addEventListener("click", (e) => {
  cards.classList.toggle("showDetails");
  details.classList.toggle("showDetails");
  searchBox.classList.toggle("showDetails");
});
