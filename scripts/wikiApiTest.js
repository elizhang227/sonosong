const omdb_api_key = '414f1f39';

const searchInput = document.getElementById('searchBarBar');
let wordInput = '';
let URL ='';

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
    });

}
