# sonoSong - Listen to Movie Soundtracks

### A Digital Crafts Project Created by Eli Zhang and RJ Salamanca

**Click Here: [sonoSong - Website](http://ec2-18-221-169-73.us-east-2.compute.amazonaws.com/)**

sono***S***ong (sono means '***that***' in japanese, so our name means '***that song***')

### Sample Search for a Movie Soundtrack

![](./images/main_tutorial.gif)

### Overview

We created a website where users are able to find the complete soundtrack for any movie they want, all conveniently located on one page and clicking on songs will load the youtube video so users do not have to copy and paste the title of the song from some other website into youtube.

The user inputs a movie title that they want the soundtrack for, it returns a list of search results where the user has to choose the desired movie. After they choose the movie there will be a list of all the songs from the soundtrack populated on the page and they have to click on a song they want to listen to and it will embed the corresponding video to the page.

For our project we used 3 APIs:
    OMDB: where we retrieved movie information from
    Wikipedia: where we retrieved the soundtrack list from
    Youtube: where we retrieved the song/video from

Eli worked on the backend starting with APIs and getting the json file to display the information on the screen and RJ started on the front-end with HTML and CSS and we merged in the middle to help each other out with features we wanted to add to the website.

### sonoSong is Web Responsive

![](./images/responsive_tutorial.gif)

### Our code and how it works (PLAY-BY-PLAY)
---

We had to use API keys for Youtube and OMDB, Wikipedia did not require one.

1. Get movie input from user  
2. input is then inserted into the OMDB API to retrieve search results of all movies containing that name 
3. using the movie name, movie year and movie poster we populate the page with all the search results for the user to choose which one they desire
4. chosen movie name then gets inserted into Wikipedia API where it searches for the page that has the soundtrack with our fail safes
5. soundtrack list is then displayed on the screen along with the movie poster (if no soundtrack is found an error screen popups)
6. user then clicks on desired song
7. song title is then sent to the Youtube API where it grabs the first video from the search results and embeds it to the screen

### Quirky Features
---

1. Clicking on our Logo Icon will reload the original page where you input a movie title.
2. You can search for a different movie on the page with the search results without having to refresh the page or go back to the home page.

### Major Struggles/Difficulties
---

1. ***Wikipedia API***:

We find an API that had information about the soundtracks of movies and after doing a lot of searching the only "reliable" place we could find it was via the Wikipedia API (We were in for a treat using this API). We decided on this because it's the same data source that google uses when searching for movie soundtracks. The documentation for the Wikipedia API was helpful and they had an example API link with query parameters. It was easier to navigate than the youtube API. However, the information from this API was formatted in a way where all the content on the page was stored in a 20000 plus character string. The  we had to use regex to filter out the information we needed (being relatively new to regex, we had to learn how to specify our queries). In addition, we learned that there was no consistency in the format on the actual Wikipedia page where they place the soundtrack information. For some movies the soundtracks would be on the mainpage of movie, and for others it would be on a different site with a different title which meant it was a totally different JSON file. For example if you searched Avengers, there is a link on that page which redirects you to a separate page and the title of that page is "Avengers (soundtrack). Our solution was to make a few fail safe cases if just the movie title did not work and put them into an array and we had to loop through the array and check if any of those concatenated search parameters yielded a page with the soundtrack.

2. ***Wikipedia Content***:

We mentioned that wikipedia has inconsistencies between URL links, we eventually found out that the content had consistencies as well. In our regex queries, we noticed that MOST movie soundtracks started with 'title1'. We would gather all the information after 'title1' until it reached 'title2'. The problem with this was we found out that some pages included html tags or non conventional characters such as the '|' character or brackets. After looking through many pages, we decided that we would skip on filtering out these outliers with the limited time we had.

3. ***Recursion***:

We noticed shortly after starting the project that when we searched wikipedia for movie soundtrack it might be stored on a different wiki page. We noticed a common pattern looking through movie pages that had soundtracks. For example, if we did a wiki API call on The_Avengers and we didn't find a sound track it would concatinate one of the following ['(film)', '(year film)','(soundtrack)', ... ] which would display The_Avengers (film), The_Avengers (2012 film), etc... Using promises we decided it was a good way to incorporate recursion into our program so that it looks through our list until it finds a soundtrack. If we searched through the list and didn't find a soundtrack we would display 'No Sound Track Found'.

4. ***Youtube API***:

Step one for our project and I think one of the biggest hurdles in the beginning was understanding and getting the APIs to work and being able to see the json file with all the information. Getting the Youtube API to work was a struggle for me because structuring the correct query parameters was difficult to understand and I couldn't find an example of it but some tinkering and experimenting was done and finally we got the API link to work and we could finally start grabbing data from the json file.

When a user clicks on a song from the soundtrack list it will return the json file of the search results on Youtube and what we had to do was filter and drill down to get the videoId and make some fail safe cases for results that came back that weren't videos (playlists). We then use the first video found for those results and grab the videoId to embedd the video on our website. There is an empty iframe tag in the place where the videos pop-up and whenever we click on a song we just set the iframe src to the corresponding youtube video and that gets updated with the video of the song on the screen. With that, the Youtube API was done.

5. ***Transitioning***:

Once we were done with the core JavaScript, we wanted to make our website look smooth when querying APIs or removing data. It was more of an annoyance than a difficulty to find where we needed to place those transitions within the JavaScript. We decided to use JavaScript to insert CSS so that the CSS is inserted inline and so that we can see what is happening instead of adding and removing classes.

### Limitations to funtionality
---

1. Super Specific Wikipages

Some pages have very specific soundtrack page names that are only unique to 1 or 2 movies. For example, the movie Moulan Rouge! the movie link is https://en.wikipedia.org/wiki/Moulin_Rouge!, normally we would do the following to search for the soundtrack if its not found on that page:

    https://en.wikipedia.org/wiki/Moulin_Rouge! + (film)
    https://en.wikipedia.org/wiki/Moulin_Rouge! + (2012%20film)
    https://en.wikipedia.org/wiki/Moulin_Rouge! + (soundtrack)
    https://en.wikipedia.org/wiki/Moulin_Rouge! + (Original Motion Picture Soundtrack)
    https://en.wikipedia.org/wiki/Moulin_Rouge! + (Music from the motion Picture)
    https://en.wikipedia.org/wiki/Moulin_Rouge! + (The Motion Picture Soundtrack)
    https://en.wikipedia.org/wiki/Moulin_Rouge! + (Highlights from the Motion Picture Soundtrack)

The soundtrack is actually stored on:
    https://en.wikipedia.org/wiki/Moulin_Rouge! + Music from Baz Luhrmann's Film.
Ultimately, our program can't get all movie soundtracks even if they are in the Wiki API.

2. Movies With the Exact Same Title

There are some movies that are more popular than others. There are a lot of movies that don't have wiki pages. For example, if we have search 'The Avengers' that starred Uma Thurman and Sean Connery, you will also see 'The Avengers' Marvel Movie. The way we search through pages (we query the pages in order in #1) it will most likely find The Avengers Marvel movie and display their soundtrack instead.

3. Youtube Embed Unavailable

Since most youtube videos we looked up had an embed code, we automatically assumed that embedding Youtube videos on our website wouldn't cause us any problems. We found out close to finishing that almost none of our videos were working locally. Once we pushed our project to EC2, most of the videos worked. Youtube video creators can deny the use of embed on their videos.

4. Short Films

Near the beginning, when we searched movies there would be many short films associated with the big production film we we're looking for. We created a filter to only populate movies that are more than 60 minutes in length. You will be unable to search for movies that are shorter than an hour.

5. Non Exact Title / Autofill

We did not create an autofill or similar match function. If you're searching for a movie, spaces and unique characters are required. For example, if you're looking for Les Misérables, you will need to type the 'é' character.