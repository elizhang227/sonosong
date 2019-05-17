const api_key = "AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk";
const soundtrackList = document.getElementById('soundTrackList');
const searchResults = document.getElementById('searchResults');
const load = document.getElementById('loadingIcon');

let searchPageCount = 0;
let searchingPage = false;

function addTrackList(listOfTracks, movieTitle) {
    let count = 1;
    //const searchResults = document.getElementById('searchResults');
    const soundTrackContainer = document.getElementById('soundTrackContainer');

    //searchResults.style.display = 'none';
    soundTrackContainer.style.display = 'block';

    Object.keys(listOfTracks).forEach(function (key) {
        let makeClassItem = document.createElement('li');
        makeClassItem.classList.add('song__item');

        let trackItem = document.createElement('span');
        trackItem.classList.add('song__title');
        trackItem.textContent = `${count}. ` + listOfTracks[key].track_name;
        count += 1;

        let timeItem = document.createElement('span');
        timeItem.classList.add('song__length');
        timeItem.textContent = listOfTracks[key].length;

        makeClassItem.append(trackItem);
        makeClassItem.append(timeItem);
        soundtrackList.append(makeClassItem);

        makeClassItem.addEventListener('click', function (e) {
            e.preventDefault();
            wordInput = listOfTracks[key].track_name + ' ' + movieTitle;
            //wordInput = listOfTracks[key].track_name + ' ' + movieName + ' song';
            console.log(wordInput);
            ytURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${wordInput}&key=${api_key}`
            // console.log(wordInput);
            // updateYTPage();
            get(ytURL)
                .then((response) => {
                    //some functions here
                    getVideoId(response);
                });
        })

    })
}

function getAlbum(wikiObject, wikiURL, movieYear, name) {
    const searchURLEnding = ['%20%28film%29', '%20%20%28' + movieYear + '%20film%29', '%20%28soundtrack%29'];

    // Going through the pages which is wikiURL + searchURLEnding
    if (searchingPage) {
        console.log('LOADING')
        load.style.opacity = 1;
        searchResults.style.transition = 'opacity 0.2s';
        searchResults.style.opacity = '0';

        searchPageCount++;
        wikiURL = wikiURL.slice(0, wikiURL.length - searchURLEnding[searchPageCount - 1].length);
    }

    if (!wikiObject.query.pages[0].missing) {
        const content = wikiObject.query.pages[0].revisions[0].content;

        let tracks = '';
        let tracksSongLength = '';
        let albumTracks = {};

        if (content.includes('title1')) {
            tracks = content.match(/title\d+.+?(?=\n)/g).map((track) => track.replace(/title\d+\s*= /g, ''));
            tracksSongLength = content.match(/length\d+.+?(?=\n)/g).map((songLength) => songLength.replace(/length\d+\s*= /g, ''));

            for (let i = 0; i < tracks.length; i++) {
                albumTracks[`title${i + 1}`] = { 'track_name': tracks[i], 'length': tracksSongLength[i] }
            }

            // RESET
            searchingPage = false;
            searchPageCount = 0;

            // Removes loading and sets search results to none
            load.style.opacity = 0;
            searchResults.style.display = 'none';
            setTimeout( addTrackList(albumTracks, name), 2000);

        } else {
            wikiURL = wikiURL + searchURLEnding[searchPageCount];
            get(wikiURL)
                .then((response) => {
                    searchingPage = true;
                    getAlbum(response, wikiURL, movieYear, name);
                })
                .catch(err =>{
                    searchingPage = false;
                    searchPageCount = 0;
                    console.log('NO SOUNDTRACK: '+ err);
                });
        }
    } else {
        wikiURL = wikiURL + searchURLEnding[searchPageCount];
        get(wikiURL)
            .then((response) => {
                searchingPage = true;
                getAlbum(response, wikiURL, movieYear, name);
            })
            .catch(err =>{
                searchingPage = false;
                searchPageCount = 0;
                console.log('NO SOUNDTRACK: '+ err);
            });
    }

    // console.log(wikiObject)

    // we need to get title 

    // Release date 

    // get composer?

    // create a dictionary for albumtracks
    // for(let i = 0; i < tracks.length; i++){
    //     albumTracks[`title${i+1}`] = {'track_name':tracks[i],'length':tracksSongLength[i]}
    // }

    //addTrackList(albumTracks)

    // get(wikiURL)
    // .then((response) => {
    //     console.log('this is the 2nd time');
    //     getAlbum(response);
    //     addTrackList(albumTracks);
    // });
}

// searchInput.addEventListener('keypress', function(e) {
//     var key = e.which || e.keyCode;
//     if (key === 13) {
//         URL = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=Avengers:_Endgame_(soundtrack)`;
//         updatePage();
//     }
// })

// function updatePage() {
//     get(URL)
//     .then((response) =>  {
//         //some functions here
//         getAlbum(response);
//         addTrackList();
//     });

// }