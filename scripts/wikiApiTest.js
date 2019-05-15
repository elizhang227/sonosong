const omdb_api_key = '414f1f39';

const searchInput = document.getElementById('searchBarBar');
let wordInput = '';
let URL ='';

let listOfTracks = {
'title1': {'track_name': "Totally Fine", 'length': "4:29"},
'title2': {'track_name': "Arrival", 'length': "1:49"},
'title3': {'track_name': "No Trust", 'length': "3:08"},
'title4': {'track_name': "Where Are They?", 'length': "3:12"},
'title5': {'track_name': "Becoming Whole Again", 'length': "3:48"},
'title6': {'track_name': "I Figured It Out", 'length': "4:30"},
'title7': {'track_name': "Perfectly Not Confusing", 'length': "4:46"},
'title8': {'track_name': "You Shouldn't Be Here", 'length': "3:33"},
'title9': {'track_name': "The How Works", 'length': "3:50"},
'title10': {'track_name': "Snap Out of It", 'length': "2:24"},
'title11': {'track_name': "So Many Stairs", 'length': "1:51"},
'title12': {'track_name': "One Shot", 'length': "2:04"},
'title13': {'track_name': "Watch Each Other's Six", 'length': "3:56"},
'title14': {'track_name': "I Can't Risk This", 'length': "4:48"},
'title15': {'track_name': "He Gave It Away", 'length': "3:42"},
'title16': {'track_name': "The Tool of a Thief", 'length': "2:58"},
'title17': {'track_name': "The Measure of a Hero", 'length': "3:05"},
'title18': {'track_name': "Destiny Fulfilled", 'length': "4:05"},
'title19': {'track_name': "In Plain Sight", 'length': "3:14"},
'title20': {'track_name': "How Do I Look?", 'length': "2:06"},
'title21': {'track_name': "Whatever It Takes", 'length': "2:56"},
'title22': {'track_name': "Not Good", 'length': "1:53"},
'title23': {'track_name': "Gotta Get Out", 'length': "2:38"},
'title24': {'track_name': "I Was Made for This", 'length': "4:37"},
'title25': {'track_name': "Tres Amigos", 'length': "3:37"},
'title26': {'track_name': "Tunnel Scape", 'length': "3:16"},
'title27': {'track_name': "Worth It", 'length': "4:15"},
'title28': {'track_name': "Portals", 'length': "3:17"},
'title29': {'track_name': "Get This Thing Started", 'length': "4:54"},
'title30': {'track_name': "The One", 'length': "2:08"},
'title31': {'track_name': "You Did Good", 'length': "1:57"},
'title32': {'track_name': "The Real Hero", 'length': "5:54"},
'title33': {'track_name': "Five Seconds", 'length': "1:45"},
'title34': {'track_name': "Go Ahead", 'length': "2:57"},
'title35': {'track_name': "Main on End", 'length': "3:11"}
}

function addTrackList() {
    let count = 1;
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
        
    })

}

function getAlbum(wikiObject) {
    const content = wikiObject.query.pages[0].revisions[0].content;
    const tracks = content.match(/title\d+.+?(?=\n\| )/g).map((track,index) => track.replace(/title\d+\s*= /g, ''));
    const tracksSongLength = content.match(/length\d+.+?(?=\n\| )/g).map((songLength,index) => songLength.replace(/length\d+\s*= /g, ''));
    const searchResults = document.getElementById('searchResults');
    let albumTracks = {};

    // we need to get title 

    // Release date 

    // get composer?
    
    // create a dictionary for albumtracks
    for(let i = 0; i < tracks.length; i++){
        albumTracks[`title${i+1}`] = {'track_name':tracks[i],'length':tracksSongLength[i]};
    }

    searchResults.style.display = 'inline';
    console.log(tracks)
    console.log(tracksSongLength)
    console.log(albumTracks)

}

searchInput.addEventListener('keypress', function(e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        wordInput += searchInput.value;

        //URL = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=The_Notebook`;
        URL = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=The_Avengers_(soundtrack)`;
        // Adds a class to the parent div so that the search bar moves up.
        updatePage();

        this.parentElement.classList.add('searchBar--To-Top');
    }
})

function updatePage() {
    get(URL)
    .then((response) =>  {
        //some functions here
        getAlbum(response);
        addTrackList();
    });

}
