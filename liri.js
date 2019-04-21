//LIRI is a _Language_ Interpretation and Recognition Interface. 
//LIRI will be a command line node app that takes in parameters and gives you back data.

//Include external modules
//Axios Promise based HTTP client for the browser and node.JS
var axios = require("axios");
//dotenv loads enviroment variables from a .env file into the process.env
//This stores configuration and access code inforation separate from code
//It will be used in this app to conceal Spotify credentials
var dotenv = require("dotenv").config();
//keys.js exports the Spotify credentials from the environment variables loaded for them by "dotenv"
var keys = require("./keys.js");
//node-spotify-api is the API liobrary for the Spotify REST API
var Spotify = require ("node-spotify-api");
//moment module will be used to format display dates and times
var moment = require ("moment");
//fs will be used for file system processing (.e. reading and writing to files)

//Create spotify client with the required credentials 
var spotify = new Spotify(keys.spotify);

//Variables 

//Node command line arguments array from the standard internal object
nodeArgs = process.argv;
//Operation argument (i.e. "concert-this", "movie-this", etc)
doThis = nodeArgs[2];
//Subject argument with artist, movie or song data is being requested for 
//Parsed to take it from node command line argumants starting with the 4th element (i.e 0= node 1=code file 2=operation 3=start of subject)
//and to join the elements from the resulting array into a string separated with spaces
var input = nodeArgs.slice (3).join(" ");

//Feature operators
//concert-this
switch (doThis) {
  case "concert-this":
    bandSearch(input)
    break;

  case "music-this":
  case "spotify-this":
  case "spotify-this-song":
    if (input == "") {
      input = "The Sign Ace of Base"
    }
    musicSearch(input)
    break;
 
  case "movie-this":
  //Default when no subject provided 
    if (input == "") {
      input = "Mr. Nobody"
    }
    movieSearch(input)
    break;   

  case "do-this":
  case "do-what-it-says":
    doItSearch(input)
    break;

  default:
    //Missing operation and subject parameters 
    console.log("Operations are 'concert-this', 'spotify-this-song', 'movie-this', and 'do-what-it-says'"); 
}
//music-this
//movie-this
//do-this


//Function calls


//Functions
function bandSearch(artist) {
  //Venue
  //Location
  //Date
  //Default - none

  //console.log("bandSearch " + input);
  if (artist == "") {
    console.log("No artist(s) specified");
    return;
  }

  //Bands In Town web API using the Axios HTTP client
  //Bands In Town API Url
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  //Axios promise "get" request
  axios.get(queryUrl)
  //Return promise handling for promise sucess
  .then (function (response) {
    //console.log(response);
    //console.log("response data" + response.data); 
    //console.log("response status" + response.status);
    

    //API Warnings and search errors 
    //console.log(response.length);
    //console.log(response.data.length);
    //console.log(typeof(response.data));

    //Instead of an object strings of "{warn=Not found}" or "{error=An error occurred while searching.}"  may be returned when search fails
      if (typeof(response.data) == "string") { 
        console.log(".then response data: " + response.data.trim());
        console.log("returning");
        return;
      }

  //Loop thru returned array of 'data' 
    
    for (i=0;i<response.data.length;i++) {
      console.log(" ");
      if (typeof(response.data[i].lineup[0]) == "string") {
        console.log(response.data[i].lineup[0]);
      }
      else {
        //console.log(response.data[i].lineup.length)
        //console.log(typeof(response.data[i].lineup[0]));
        //console.log(response.data[i].lineup[0]);
        for (j=0; j < response.data[j].lineup.length; j++) {
          console.log(response.data[i].lineup[j]);
        }
      }
      if (response.data[i].description !== "") {
        console.log(response.data[i].description);
      }
      console.log("At the " + response.data[i].venue.name);
      console.log(moment(response.data[i].datetime).format("MM-DD-YYYY")); 
      if (response.data[i].venue.country == "United States") {
        console.log(response.data[i].venue.city + ", " + response.data[i].venue.region )
      }
      else {console.log(response.data[i].venue.city)};
      console.log(response.data[i].venue.country);
    }//end for  
    
  })//end then function
    
  //Handling for promise failure
  .catch(function (error) {
      console.log(".catch error: " + error)
      //console.log("error response status: " + error.response.status);
      //console.log("error response data message: " + error.response.data.message);

  })//end catch function
   
}//end bandSearch function

function musicSearch(song) {
//Artist
//Song
//Link to sample
//Album
//Default - "The Sign" by Ace of Base
console.log("musicSearch " + input);
  spotify.search({ type: "track", query: song }, function (err, data) {
    if (err) {
      return console.log(err);
    }

    if (typeof(data.tracks.items) == "string") {
      return console.log("Empty data returned for " + song);
    }

    if (data.tracks.items.length) {
      for (i=0; i < data.tracks.items.length; i++) {
        console.log(" ");
        console.log("Name: " + data.tracks.items[i].name)
        for (j=0; j < data.tracks.items[j].artists.length; j++) {
          console.log("Artist: " + data.tracks.items[i].artists[j].name)
        }
        console.log("Album: " + data.tracks.items[i].album.name)
        console.log("Release: " + data.tracks.items[i].album.release_date)
        console.log("Preview: " + data.tracks.items[i].preview_url)
      } 
    }
    else {
      console.log(song + " not found");
      musicSearch("The Sign Ace of Base ");
    }
  })//end search 
}//end musicSearch function  

function movieSearch(movieName) {
//Movie title
//Release year
//Rating
//Rotten Tomatoes ranking
//Country
//Language
//Plot
//Actors
//Default - "Mr. Nobody"
console.log("movieSearch " + input);
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response){
      if ((typeof(response.data) !== "string") &&
          (response.data.Response == "True")) {
        console.log("Title:    " + response.data.Title);
        console.log("Year:     " + response.data.Year);
        console.log("Rated:    " + response.data.Rated);

        for (i=0; i < response.data.Ratings.length; i++) {
          if (response.data.Ratings[i].Source == 'Rotten Tomatoes'){
            console.log(response.data.Ratings[i].Source + " Rating " + response.data.Ratings[i].Value)
          }//end if 
        }//end for
        console.log("Country:  " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot:     " + response.data.Plot);
        console.log("Actors:   " + response.data.Actors);
        console.log("Released: " + response.data.Released);
        console.log("Runtime:  " + response.data.Runtime);
        console.log("Genre:    " + response.data.Genre);
        console.log("Director: " + response.data.Director);
        console.log("Write:    " + response.data.Writer);
      }//end if
      else {
        console.log("No data for " + movieName);
      }
    }//end function response
  )//end .then
  .catch(function (error) {
    console.log(".catch error: " + error)
    //console.log("error response status: " + error.response.status);
    //console.log("error response data message: " + error.response.data.message);

  })//end catch function
 

}

function doItSearch() {
//Read operation and subject arguments for file and process just as command line
console.log("doItSearch " + input);
}