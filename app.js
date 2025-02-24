//setup
const express = require("express");
var cors = require("cors");
//activate
const bodyParser = require("body-parser");
const Song = require("./models/songs");
const app = express();
app.use(cors());

app.use(express.json());
const router = express.Router();

//get all songs
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.send(songs);
    console.log(songs);
  } catch (err) {
    console.log(err);
  }
});

router.get("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.json(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/songs", async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400);
    console.log(err);
  }
});

router.put("/songs/:id", async (req, res) => {
  try {
    const song = req.body;
    await Song.updateOne({ _id: req.params.id }, song);
    console.log(song);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});
//all requests that usually use an api start with /api
app.use("/api", router);
app.listen(3000);
