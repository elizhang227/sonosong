const omdb_api_key = '414f1f39';
const searchInput = document.getElementById('searchBarBar');
const movieItem = document.getElementsByClassName('movie__item');
let URL = '';

function getMovies(omdbMovie) {
    const searchResults = document.getElementById('searchResults');
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    //searchResults.style.height = '0px';

    if(omdbMovie != undefined){
        if(omdbMovie.Search != undefined){
            omdbMovie.Search.forEach(function(movie,index) {
                // SEARCH INDIVIDUAL FULL
                var individualMovie = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${omdb_api_key}`;
                get(individualMovie)
                    .then((response)=>{
                        let load = document.getElementById('loadingIcon');
                        load.classList.add('loadingNow')

                        setTimeout(function(){
                            getSingleMovie(response,index);
                            document.getElementsByClassName('loadingNow')[0].style.opacity = 0 ;
                            //searchResults.style.height = movieList.offsetHeight+'px';
                        }, 1500);
                    })
                    .then(()=>{
                        console.log(movieList.offsetHeight)
                        searchInput.parentElement.classList.add('searchBar--To-Top')
                        // setTimeout(function(){
                        //     searchResults.style.height = movieList.offsetHeight;
                        // },1500)
                    })
            });

            //searchResults.style.display = 'inline';
            //searchInput.parentElement.classList.add('searchBar--To-Top');
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
            const movieTitle = document.createElement('figcaption');

            // Variables to be sent to wiki URL
            const movieYear = movie.Year;

            // add classes for styling purposes
            movieItem.classList.add('movie__item');
            movieItem.setAttribute('id',`movie${index}`)
            moviePoster.classList.add('movie__item-image');
            movieTitle.classList.add('movie__title')
            // updating image and h3
            moviePoster.src = movie.Poster;
            movieTitle.textContent = movie.Title;
    
            // appending items
            movieItem.append(moviePoster);
            movieItem.append(movieTitle);
            movieList.append(movieItem);

            // event listener for each movie
            movieItem.addEventListener('click',function(e){
                // URL CODES : https://www.w3schools.com/tags/ref_urlencode.asp
                let wikiURL = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=${movieTitle.textContent}`;
                
                //let wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=Avengers:_Endgame_(soundtrack%29';
                get(wikiURL)
                .then((response) =>  {
                    console.log(encodeURI(wikiURL))
                    getAlbum(response);
                    addTrackList();
                });
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
    }
})