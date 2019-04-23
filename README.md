# liri-node-app

## Description 

This app uses node.JS and package libraries and APIs to request and receive data for entertainment searches. This app is console based and does not contain a web pages component. As such the screen results are provided in a recording, in a log file, and in screen captures, all of which can be found in the github repo for the project.
* 

## Sources
* Information on upcoming concerts for a specific artist will be obtained from the Bands In Town web API using the Axios HTTP client

* Information on specific song releases will be obtained from Spotify through the node-spotify-api REST API package

* Information on specific movies will be obtained from the OMDB web APi using the Axios HTTP client

## Functionality

The app will accept an operation specifier and a subject specifier for each type of information through the console. 
It will also support another special operation that will take in input of an operation and subject from a file and process them just as if they had been entered through the console. 
The app will also log output to both a file (LIRI.log) and to the console.

## Components
* `keys.js` - Contains the code to export the Spotify credentials from the environment variables which were loaded by the "dotenv" package  
* `LIRI recording URL.txt` - Contains the URL of the screentastify recording of the app running for each operation and default,
 with the output being streamed to the console.   
* `liri.js` - Contains the Node.JS javascript code for the app.  
*  
* `node_modules/` - Contains the node packages used by the app   
* `package.json` - Contains manifest data about the external package used by the app as well the urls for the git repo and issue list for the app    
* `package-lock.json` - Contains version and location information for every module from every external package used by the app   
* `random.txt` - Contains input arguments for the app to demonstrate using a file for input.  
* `README.md` - Contains documentation for the app.
* `.env` - Contains credentials that will be loaded into environment variables by the dotenv package. Note that this is not pushed to github and that users must provide thier own credentials in thier own file. 
* `.gitignore` - Contains a list of files which are not to be pushed to github.  


## Instructions 

The app uses the node-spotify-api for song track information. _That api requires Spotify credentials tha must be included in a `.env` file as:_

<code># Spotify API keys</code>

<code>SPOTIFY_ID=< user's spotify ID> </code>

<code>SPOTIFY_SECRET=< user's spotify 'secret'> </code>

_Since this app does not use web pages it must be run from a console as follows:_

``` 
node liri.js operation-arg subject-arg
``` 

_Where operation-arg is one of:_

* "concert-this" for Bands In Town API data on the specified subject
* "spotify-this-song" for node-spotify-api Spotify API data on the specified subject <sup>1</sup>
* "movie-this" for OMDB APi data on the specified subject <sup>2</sup>
* "do-what-it-says" to obtain operation and subject arguments from a 'random.txt' file

The subject-arg is _the name of the concert artist or group, the name of a published song, or the the name of a movie_, respectively.

<sup>1</sup> If no subject is provided with the "spotify-this-song" operation the app will default to the song "The Sign" by Ace of Base. 

<sup>2</sup> if no subject is provided with the "movie-this" operation the app will defaul to the movie "Mr. Nobody". 


## Artifacts
* github repo: `bigalr8/liri-node-app`
* Screen results recording: `https://drive.google.com/file/d/1i9Km-fLEjHbV9rsVe6YDUnKU_8Cvy5hN/view`
* `LIRI.log` - Log file of output from the app for each operation    
* `Capture concert-this.PNG` - Screen capture image of console output for "concert-this" operation     
* `Capture movie-this.PNG` - Screen capture image of console output for "movie-this" operation    
* `Capture movie-this no subject.PNG` - Screen capture image of console output for "movie-this" default operation when no subject            
* `Capture spotify-this-song.PNG` - Screen capture image of console output for "spotify-this-song" operation
* `Capture spotify-this-song no subject.PNG`- Screen capture image of console output for "spotify-this-song" default operation when no subject 
* `Capture do-what-it-says.PNG`- Screen capture image of console output for "do-what-it-says" operation          

## Notes

Each of the APIs used to obtain data for this app had it's own nuances when data was not found. 

In some cases a string with a warning or error would be returned in the response data instead of error data. 

In the case of OMDB for movie data a "Response" string of "True" or "False" indicated whether or not a search returned data.  

