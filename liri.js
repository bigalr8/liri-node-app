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

//Node arguments
//feature operators
//concert-this
//music-this
//movie-this
//do-this


//Function calls


//Functions
