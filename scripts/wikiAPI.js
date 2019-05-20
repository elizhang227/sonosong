const api_key = 'AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk',
    soundtrackList = document.getElementById('soundTrackList'),
    searchResults = document.getElementById('searchResults'),
    load = document.getElementById('loadingIcon')
    moviePicture = document.getElementById('moviePicture-image');

let searchPageCount = 0,
    searchingPage = false;

function addTrackList(listOfTracks, movieTitle, moviePoster) {
    const soundTrackContainer = document.getElementById('soundTrackContainer');
    const moviePic = document.createElement('img');
    let moviePicName = document.createElement('div');
    let count = 1;

    soundTrackContainer.style.transition = 'opacity 1s';
    soundTrackContainer.style.opacity = '1';

    // Adds movie poster and name to the page with the soundtrack list and youtube video
    moviePic.src = moviePoster;
    moviePic.classList.add('moviePicture-image-picture');
    moviePicName.textContent = movieTitle;
    moviePicName.classList.add('moviePicture-image-name');
    moviePicture.append(moviePic,moviePicName);

    Object.keys(listOfTracks).forEach(function (key) {
        // Creating list items for songs
        const makeClassItem = document.createElement('li'),
            trackItem = document.createElement('span'),
            timeItem = document.createElement('span'),
            horizontalLine = document.createElement('hr');

        makeClassItem.classList.add('song__item');

        trackItem.classList.add('song__title');
        trackItem.textContent = `${count}.     ` + listOfTracks[key].track_name;
        count += 1;

        timeItem.classList.add('song__length');
        timeItem.textContent = listOfTracks[key].length;

        horizontalLine.classList.add('trackLine');

        makeClassItem.append(trackItem, timeItem);
        soundtrackList.append(makeClassItem,horizontalLine);

        makeClassItem.addEventListener('click', function (e) {
            e.preventDefault();
            wordInput = listOfTracks[key].track_name + ' ' + movieTitle;

            const findBars = document.getElementById('bars');

            if(findBars !=  null){
                findBars.remove();
            }
                const bars = document.createElement('span');
                bars.setAttribute('id','bars')

                for(var i = 0; i<3; i++){
                    let bar = document.createElement('span');
                    bar.classList.add('bar')
                    bars.append(bar)   
                }
                makeClassItem.childNodes[0].append(bars)

            ytURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${wordInput}&key=${api_key}`
            get(ytURL)
                .then((response) => {
                    //some functions here
                    getVideoId(response);
                });
        })
    })
}

function getAlbum(wikiObject, wikiURL, movieYear, movieTitle, moviePoster) {
    // URL CODES : https://www.w3schools.com/tags/ref_urlencode.asp
    // array for recursion to search specific terms
    const searchURLEnding = ['%20%28film%29', '%20%20%28' + movieYear + '%20film%29', '%20%28soundtrack%29'];

    //////////////////
    // LEBRON JAMES //
    //////////////////

    const body = document.getElementById('bodyclass');
    let noSoundTrack = document.createElement('iframe');

    noSoundTrack.setAttribute('id', 'noSoundTrack');
    noSoundTrack.src = 'https://www.youtube.com/embed/5y_cl3WIO6A?autoplay=1&loop=1&playlist=5y_cl3WIO6A';
    noSoundTrack.setAttribute('frameborder',0);
    noSoundTrack.setAttribute('allow','accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    noSoundTrack.setAttribute('allowfullscreen','');

    //////////////////
    // LEBRON JAMES //
    //////////////////

    // Going through the pages which is wikiURL + searchURLEnding
    if (searchingPage) {
        console.log('LOADING')
        load.style.opacity = 1;
        searchResults.style.opacity = 0;
        searchPageCount++;
        wikiURL = wikiURL.slice(0, wikiURL.length - searchURLEnding[searchPageCount - 1].length);
    }

    if (!wikiObject.query.pages[0].missing) {
        const content = wikiObject.query.pages[0].revisions[0].content;

        let tracks = '';
        let tracksSongLength = '';
        let albumTracks = {};

        if (content.includes('title1')) {
            // Regex for getting song names and lengths
            tracks = content.match(/title\d+.+?(?=\n)/g).map((track) => {
                if(track.indexOf('[') == -1){
                    return track.replace(/title\d+\s*= /g, '')
                } else {
                    return track.replace(/title\d+\s*= \[+|\]+/g, '')
                }
            });
            tracksSongLength = content.match(/length\d+.+?(?=\n)/g).map((songLength) => songLength.replace(/length\d+\s*= /g, ''));

            for (let i = 0; i < tracks.length; i++) {
                albumTracks[`title${i + 1}`] = { 'track_name': tracks[i], 'length': tracksSongLength[i] }
            }

            // RESET
            searchingPage = false;
            searchPageCount = 0;
            searchResults.style.opacity = 0;

            setTimeout(()=>{
                load.style.opacity = 0;
                soundTrackContainer.style.display = 'block';
                searchResults.style.display = 'none';

                addTrackList(albumTracks, movieTitle, moviePoster);
            }, 1000);

        } else {
            catchError();
        }
    } else {
        catchError();
    }

    // Function to catch errors and change wikiURL
    // catchError scope is only for getAlbum
    function catchError() {
        wikiURL = wikiURL + searchURLEnding[searchPageCount];

        get(wikiURL)
            .then((response) => {
                searchingPage = true;
                getAlbum(response, wikiURL, movieYear, movieTitle, moviePoster);
            })
            .catch(err =>{
                // RESET
                searchingPage = false;
                searchPageCount = 0;

                // Removes loading and sets search results to none
                searchResults.style.opacity = 0;

                setTimeout(()=> {
                    load.style.opacity = 0;
                    searchResults.style.display = 'none'
                }, 1000);

                // If no soundtrack available for movie appends error message
                body.append(noSoundTrack);
            });
    }
}