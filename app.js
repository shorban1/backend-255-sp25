const express = require("express");
const Song = require("./models/songs");
var cors = require("cors");
//const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
const User = require("./models/users");

const app = express();
app.use(cors());

app.use(express.json());

const router = express.Router();
const secret = "supersecret";

//creating a new user
router.post("/users", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password");
  }

  const newUser = await new User({
    username: req.body.username,
    password: req.body.password,
    status: req.body.status,
  });
  try {
    await newUser.save();
    console.log(newUser);
    res.status(201).send("User created");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/auth", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password");
    return;
  }
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(401).json({ error: "Bad Username" });
  } else if (user.password != req.body.password) {
    res.status(401).send("Bad password");
  } else {
    username2 = user.username;
    const token = jwt.encode({ username: user.username }, secret);
    const auth = 1;

    res.json({ username2, token: token, auth: auth });
  }
});

router.get("/users", async (req, res) => {
  if (!req.headers["x-auth"]) {
    return res.status(401).json({ error: "Missing X-Auth" });
  }

  const token = req.headers["x-auth"];
  try {
    const decoded = jwt.decode(token, secret);

    let users = User.find({}, "username status");
    res.json(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

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

router.delete("/songs/:id", async (req, res) => {
  try {
    await Song.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(400);
  }
});
//all requests that usually use an api start with /api
app.use("/api", router);
app.listen(3000);
