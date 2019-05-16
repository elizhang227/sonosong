const api_key = "AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk";

const soundtrackList = document.getElementById('soundTrackList');

function addTrackList(listOfTracks) {
    let count = 1;
    const searchResults = document.getElementById('searchResults');
    const soundTrackContainer = document.getElementById('soundTrackContainer');

    searchResults.style.display = 'none';
    soundTrackContainer.style.display = 'block';
    
    Object.keys(listOfTracks).forEach(function(key) {
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

        makeClassItem.addEventListener('click', function(e) {
            e.preventDefault();
            wordInput = listOfTracks[key].track_name;
            ytURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${wordInput}&key=${api_key}`
            // console.log(wordInput);
            // updateYTPage();
            get(ytURL)
            .then((response) =>  {
                //some functions here
                getVideoId(response);
            });
        })
        
    })
}

function getAlbum(wikiObject, wikiURL, movieYear) {

    const content = wikiObject.query.pages[0].revisions[0].content;

    let tracks = '';
    let tracksSongLength = '';
    // const tracks = content.match(/title\d+.+?(?=\n\| )/g).map((track,index) => track.replace(/title\d+\s*= /g, ''));
    // const tracksSongLength = content.match(/length\d+.+?(?=\n\| )/g).map((songLength,index) => songLength.replace(/length\d+\s*= /g, ''));
    let albumTracks = {};

    if (content.includes('title1')) {
        console.log('YES THIS EXISTS');
        tracks = content.match(/title\d+.+?(?=\n)/g).map((track,index) => track.replace(/title\d+\s*= /g, ''));
        console.log(tracks);
        tracksSongLength = content.match(/length\d+.+?(?=\n)/g).map((songLength,index) => songLength.replace(/length\d+\s*= /g, ''));
        console.log(tracksSongLength);
        for(let i = 0; i < tracks.length; i++){
            albumTracks[`title${i+1}`] = {'track_name':tracks[i],'length':tracksSongLength[i]}
        }
        addTrackList(albumTracks);
    }
    else {
        wikiURL = encodeURI(wikiURL);
        console.log('DOES NOT EXIST');
        wikiURL += '%20%28'+ movieYear +'%20film%29';
        console.log(wikiURL);
        get(wikiURL)
        .then((response) => {
            console.log('this is the 2nd time');
            getAlbum(response);
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