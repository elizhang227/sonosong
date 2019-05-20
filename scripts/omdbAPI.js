const omdb_api_key = '414f1f39',
    searchInput = document.getElementById('searchBarBar'),
    movieItem = document.getElementsByClassName('movie__item'),
    soundTrackContainer = document.getElementById('soundTrackContainer');

let URL = '';

function getMovies(omdbMovie) {
    const searchResults = document.getElementById('searchResults'),
        movieList = document.getElementById('movieList'),
        error = document.getElementById('noSoundTrack');
    // Resets the soundtrack container elements
    document.getElementById('moviePicture-image').innerHTML = '';
    document.getElementById('soundTrackList').innerHTML = '';
    document.getElementsByClassName('youtubeVideoContainer')[0].childNodes[3].src = '';

    if(error) error.remove();   

    // Empties the list to populate searches
    if(omdbMovie != undefined){
        if(omdbMovie.Search != undefined){
            // CSS Stylings for when we have movies
            searchResults.style.transition = 'opacity 1s';
            searchResults.style.opacity = 0;
            setTimeout(()=>{
                searchResults.style.display = 'block';
                movieList.innerHTML = '';
            }, 1000);

            // Checks if the user has soundTrackContainer displayed
            // It will be displayed if the movie has or doesnt have a soundtrack
            if(soundTrackContainer.style.display == 'block'){
                // Used time out function to wait for transition
                soundTrackContainer.style.transition = 'opacity 1s';
                soundTrackContainer.style.opacity = 0;
                setTimeout(()=>soundTrackContainer.style.display = 'none', 1000);
            }

            omdbMovie.Search.forEach(function(movie,index) {
                // SEARCH INDIVIDUAL FULL
                let individualMovie = `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${omdb_api_key}`;
                get(individualMovie)
                    .then((response)=>{
                        const load = document.getElementById('loadingIcon');

                        if(load.classList.value.indexOf('loadingNow') == -1 ){
                            load.classList.add('loadingNow');
                        } else {
                            document.getElementsByClassName('loadingNow')[0].style.opacity = 1;
                        }

                        searchInput.parentElement.classList.add('searchBar--To-Top');

                        setTimeout(function(){
                            getSingleMovie(response,index);
                            document.getElementsByClassName('loadingNow')[0].style.opacity = 0 ;
                            searchResults.style.opacity = 1;
                        }, 1500);
                    });
            });
        }
    }
}

function getSingleMovie(movie, index){
    if(movie.Runtime != 'N/A'){
        const movieLength = Number(movie.Runtime.match(/\d+/g)[0]);

        if(movieLength != null && movieLength > 60){

            // creating elements
            const movieItem = document.createElement('li'),
                moviePoster = document.createElement('img'),
                movieTitle = document.createElement('figcaption'),
                movieYear = document.createElement('figcaption');

            // add classes for styling purposes
            movieItem.classList.add('movie__item');
            movieItem.setAttribute('id',`movie${index}`)
            moviePoster.classList.add('movie__item-image');
            movieTitle.classList.add('movie__title');
            movieYear.classList.add('movie__year');

            // updating image and h3
            movieTitle.textContent = movie.Title;
            movieYear.textContent = movie.Year;

            // sets movie poster to 404 image if none is found
            if(movie.Poster == 'N/A'){
                moviePoster.src = './images/404Poster.jpg'
            } else {
                fetch(movie.Poster)
                    .then(response=>{
                        moviePoster.src = response.url
                    }).catch(moviePoster.src = './images/404Poster.jpg')
            }    

            // appending items
            movieItem.append(moviePoster, movieTitle);
            movieList.append(movieItem);

            // event listener for each movie
            movieItem.addEventListener('click',function(e){
                let wikiURL = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=${movieTitle.textContent}`;
                get(wikiURL)
                .then((response) =>  {
                    getAlbum(response, wikiURL, movie.Year, movie.Title, moviePoster.src);
                });
            });
        }
    }
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
});