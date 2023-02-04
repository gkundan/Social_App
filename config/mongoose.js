const mongoose = require("mongoose");

///*connect to database* */
mongoose.connect("mongodb://127.0.0.1/codeial_development", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error Connecting to DB."));

db.once("open", function () {
  console.log("Connected to Database :: Mongodb.");
});

//export
module.exports = db;
