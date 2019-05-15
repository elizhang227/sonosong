const omdb_api_key = '414f1f39';
const searchInput = document.getElementById('searchBarBar');
const movieItem = document.getElementsByClassName('movie__item');
let URL = '';

function getMovies(omdbMovie) {
    const searchResults = document.getElementById('searchResults');
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    if(omdbMovie != undefined){
        if(omdbMovie.Search != undefined){
            omdbMovie.Search.forEach(function(movie,index) {
                // SEARCH INDIVIDUAL FULL
                var individualMovie = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${omdb_api_key}`;
                get(individualMovie)
                    .then(response => getSingleMovie(response,index))
            });
            
            searchResults.style.display = 'inline';
            searchInput.parentElement.classList.add('searchBar--To-Top');
        }
    }
}

function getSingleMovie(movie, index){
    if(movie.Runtime != 'N/A'){
        const movieLength = Number(movie.Runtime.match(/\d+/g)[0]);
        if(movieLength != null && movieLength > 60){
            // creating elements
            const movieItem = document.createElement('li');
            const moviePoster = document.createElement('img');
            const movieTitle = document.createElement('h3');

            // add classes for styling purposes
            movieItem.classList.add('movie__item');
            movieItem.setAttribute('id',`movie${index}`)
            moviePoster.classList.add('movie__item-image');
            
            // updating image and h3
            moviePoster.src = movie.Poster;
            movieTitle.textContent = movie.Title;
    
            // appending items
            movieItem.append(moviePoster);
            movieItem.append(movieTitle);
            movieList.append(movieItem);

            // event listener for each movie
            movieItem.addEventListener('click',function(e){
                console.log(this)
            });
        }
    }
}

function updatePage() {
    get(URL)
    .then((response) =>  {
        getMovies(response);
    });
}

searchInput.addEventListener('keypress', function(e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        let search = this.value;
        URL = `http://www.omdbapi.com/?s=${search}&plot=full&apikey=${omdb_api_key}`;
        get(URL)
        .then((response) =>  {
            getMovies(response);
        });
        // Adds a class to the parent div so that the search bar moves up.
    }
})