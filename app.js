const express = require("express");

//expres app
const app = express();

//listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("<p>About Page</p>");
  res.sendFile("./about.html", { root: __dirname });

});
