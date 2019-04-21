//LIRI is a _Language_ Interpretation and Recognition Interface. 
//LIRI will be a command line node app that takes in parameters and gives you back data.

//Include external modules
//Axios Promise based HTTP client for the browser and node.JS
var axios = require("axios");
//dotenv loads enviroment variables from a .env file into the process.env
//This stores configuration and access code inforation separate from code
//It will be used in this app to conceal Spotify credentials
var dotenv = require("dotenv");
//keys.js exports the Spotify credentials from the environment variables loaded for them by "dotenv"
var keys = require("./keys.js");
//node-spotify-api is the API liobrary for the Spotify REST API
var Spotify = require ("node-spotify-api");
//moment module will be used to format display dates and times
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
  
}
//music-this
//movie-this
//do-this


//Function calls


//Functions
function bandSearch() {
//Venue
//Location
//Date

  }

function musicSearch() {
//Artist
//Song
//Link to sample
//Album

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
}

function doItSearch() {
//Read operation and subject arguments for file and process just as command line

}