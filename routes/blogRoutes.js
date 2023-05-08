const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

//ALL BLOGS
router.get("/", blogController.blog_index);

//POST
router.post("/", blogController.blog_create_post);

//create blog
router.get("/create", blogController.blog_create_get);

//details
router.get("/:id", blogController.blog_details);

//DELETE BLOG
router.delete("/:id", blogController.blog_delete);

module.exports = router;
