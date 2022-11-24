const express = require("express");

const app = express();
const port = 8000;

///****     --- used express router         */
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
