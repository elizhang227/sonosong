const searchInput = document.getElementById('searchBarBar');

let URL ='';

function getAlbum(wikiObject) {
    const content = wikiObject.query.pages[0].revisions[0].content;
    const tracks = content.match(/title\d+.+?(?=\n\| )/g).map((track,index) => track.split(`title${index+1} = `)[1]);
    const tracksSongLength = content.match(/length\d+.+?(?=\n\| )/g).map((songLength,index) => songLength.split(`length${index+1} = `)[1]);
    let albumTracks = {};

    // we need to get title 

    // Release date 

    // get composer?
    
    // create a dictionary for albumtracks
    for(let i = 0; i < tracks.length; i++){
        albumTracks[`title${i+1}`] = {'track name':tracks[i],'length':tracksSongLength[i]}
    }

    console.log(tracks)
    console.log(tracksSongLength)
    console.log(albumTracks)

}

searchInput.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        //Updates empty string with the inputted search term from search bar
        //wordInput += searchInput.value;
        //Updates the query search with the inputted search term from search bar

        //URL = `https://en.wikipedia.org/w/api.php?action=query&titles=San_Francisco&prop=images&imlimit=20&origin=*&format=json&formatversion=2`;
          URL = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&origin=*&format=json&formatversion=2&titles=Avengers:_Endgame_(soundtrack)`;
        updatePage();
    }
})

function updatePage() {
    get(URL)
    .then((response) =>  {
        //some functions here
        getAlbum(response);
    });

}
