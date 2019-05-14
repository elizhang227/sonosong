api_key = "AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk";

const videoDiv = document.getElementsByClassName('youtubeVideoContainer')[0];
const searchInput = document.getElementById('searchBarBar');
let wordInput = '';
let URL ='';

function getVideoId(object) {
    const vidId = object.items[0].id.videoId;
    //console.log(vidId);
    const iFrame = videoDiv.getElementsByTagName("iframe")[0];
    iFrame.setAttribute("src", `https://www.youtube.com/embed/${vidId}`);
    console.log(videoDiv.innerHTML);

}

searchInput.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        wordInput += searchInput.value;
        URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${wordInput}&key=AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk`;
        console.log(wordInput);
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

