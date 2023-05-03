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
// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Nodejs test title",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Nodejs and ejs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Nodejs for Dummies",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
