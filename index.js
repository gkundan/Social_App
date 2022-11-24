const express = require("express");

const app = express();
const port = 8000;

//******    -- FireUp the Server >     */
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is up and running & running port is : ${port}`);
});
