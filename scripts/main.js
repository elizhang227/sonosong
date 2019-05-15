api_key = "AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk";

const videoDiv = document.getElementsByClassName('youtubeVideoContainer')[0];
const searchInput = document.getElementById('searchBarBar');
let wordInput = '';
let URL ='';

function getVideoId(object) {
    const vidId = object.items[0].id.videoId;
    const iFrame = videoDiv.getElementsByTagName("iframe")[0];
    iFrame.setAttribute("src", `https://www.youtube.com/embed/${vidId}`);
}

searchInput.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        //Updates empty string with the inputted search term from search bar
        wordInput += searchInput.value;
        //Updates the query search with the inputted search term from search bar
        URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${wordInput}&key=${api_key}`;
        updatePage();
    }
})

function updatePage() {
    get(URL)
    .then((response) =>  {
        //some functions here
        getVideoId(response);
    });

}

