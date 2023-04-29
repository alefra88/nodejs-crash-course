const express = require("express");

//expres app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("<p>About Page</p>");
  res.sendFile("./about.html", { root: __dirname });
});

//Redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404
app.use((req, res) => {
  res.status(404).sendFile("./404.html", { root: __dirname });
});
