const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
//used for session cookies and passport auth
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
// layout calls before routes always ...***** /
app.use(expressLayouts);

///****     --- Views Engine..     */
app.set("view engine", "ejs");
app.set("views", "./views");

///**** log IN session and auth */
app.use(
  session({
    name: "codieal",
    //change the secret before deployment .
    secret: "beyoundSomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

///****     --- using express router         */
app.use("/", require("./routes"));

//******    -- FireUp the Server >     */
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(
    `******_ Server is up and running & running port is : ${port} _********** `
  );
});
