const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shorban1:aut9YROI7kxhCxgi@songdb.uazm3.mongodb.net/?retryWrites=true&w=majority&appName=SongDB",
  { useNewUrlParser: true }
);

module.exports = mongoose;
