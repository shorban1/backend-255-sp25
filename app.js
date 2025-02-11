//setup
const express = require("express");
var cors = require('cors');
//activate
const app = express();
app.use(cors());
const router = express.Router();



//making an API using routes
//Routes are used to handle browser requests in the form of url

//Get or regular request when someone goes to http://localhost:3000/hello
app.get("/hello", function(req, res){
    res.send("<h1>Hello Express!</h1>");
});
app.get("/goodbye", function(req, res){
    res.send("<h1>Goodbye Express!</h1>");
});

//making an api using routes

router.get("/songs", function(req, res){
    const song = [{
        title: "We Found Love",
        artist: "Rihanna",
        popularity: 10,
        releaseDate: new Date(2011, 9, 22),
        genre: ["electro house"]
    },{
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 10,
        releaseDate: new Date(2013, 11, 21),
        genre: ["soul", "new soul"]
    }]

    res.json(song);
});

//all requests that usually use an api start with /api
app.use("/api", router);
app.listen(3000);