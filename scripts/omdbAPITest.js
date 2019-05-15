const omdb_api_key = '414f1f39';
const searchInput = document.getElementById('searchBarBar');

let URL ='';

function getMovies(omdbMovie) {
    const searchResults = document.getElementById('searchResults');
    const movieList = document.getElementById('movieList');

    console.log(omdbMovie)
    omdbMovie.Search.forEach(function(movie) {
        const movieItem = document.createElement('li')//.classList.add('movie__item');
        const moviePoster = document.createElement('img')//.classList.add('movie__item-image');
        const movieTitle = document.createElement('h3');

        // add classes for styling purposes
        movieItem.classList.add('movie__item')
        moviePoster.classList.add('movie__item-image');
        
        moviePoster.src = movie.Poster;
        movieTitle.textContent = movie.Title;

        movieItem.append(moviePoster);
        movieItem.append(movieTitle);
        movieList.append(movieItem);
    });

    searchResults.style.display = 'inline';

}

searchInput.addEventListener('keypress', function(e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        let search = this.value;
        URL = `http://www.omdbapi.com/?s=${search}&plot=full&apikey=${omdb_api_key}`;
        updatePage();

        // Adds a class to the parent div so that the search bar moves up.
        this.parentElement.classList.add('searchBar--To-Top');
    }
})

function updatePage() {
    get(URL)
    .then((response) =>  {
        //some functions here
        getMovies(response);
    });
}
