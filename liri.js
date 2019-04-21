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

function musicSearch() {
//Artist
//Song
//Link to sample
//Album
//Default - "The Sign" by Ace of Base
console.log("musicSearch " + input);
}  

function movieSearch() {
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
}

function doItSearch() {
//Read operation and subject arguments for file and process just as command line
console.log("doItSearch " + input);
}