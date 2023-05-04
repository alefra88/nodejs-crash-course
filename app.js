const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

//connect to DB
const dbURI =
  "mongodb+srv://admin:9zkPw8gvTH45jIRb@cluster0.3narixn.mongodb.net/blogDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Testing
//Add blogs
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "About my new blog",
    body: "More about my new blog xd",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//get all blogs
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//get a single blog
app.get("/single-blog", (req, res) => {
  Blog.findById("645223a283a6c901bd715e0f")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
//blog routes
//HOME
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
//ABOUT
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
//create blog
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});
//ALL BLOGS
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//POST
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
