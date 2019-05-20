api_key = 'AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk';
const videoDiv = document.getElementsByClassName('youtubeVideoContainer')[0];

function getVideoId(object) {
    let count = 0;
    // Sets vidId to the first video in the search results
    let vidId = object.items[count].id.videoId;
    // If first result is not a video go to the next result
    while (vidId === undefined) {
        count++;
        vidId = object.items[count].id.videoId;
    }
    const iFrame = videoDiv.getElementsByTagName('iframe')[0];
    iFrame.setAttribute("src", `https://www.youtube.com/embed/${vidId}`);
}