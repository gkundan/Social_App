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
const MongoStore = require("connect-mongo");
//sass
const sassMiddleware = require("node-sass-middleware");
//flash message
const flash = require("connect-flash");
const customMwre = require("./config/middleware");

//scss file execution or middleware setup
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

//
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
//make the upload path available for the browser.
app.use("/upload", express.static(__dirname + "/upload"));
// layout calls before routes always ...***** /
app.use(expressLayouts);

///****     --- Views Engine..     */
app.set("view engine", "ejs");
app.set("views", "./views");

///**** log IN session and auth */
// monogo store is used to store the session cookies in db
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
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect setup Ok!");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use flash connect
app.use(flash());
app.use(customMwre.setFlash);
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
