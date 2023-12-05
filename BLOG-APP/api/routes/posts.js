const router = require("express").Router();
const Post = require("../models/Post");
const Category = require("../models/Category");
const { response } = require("express");
///////////////////////////////

// CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const categoriesInput = req.body.categories;
  let categoriesToSave = [];

  if (Array.isArray(categoriesInput)) {
    // If input is an array, map each element to a string and add to the categoriesToSave array
    categoriesToSave = categoriesInput.map(String);
  } else {
    // If input is not an array, convert it to a single-element array containing the string representation
    categoriesToSave = [String(categoriesInput)];
  }
  try {
    const savedCategories = await Promise.all(
      categoriesToSave.map(async (category) => {
        const newCategory = new Category({ name: category });
        return await newCategory.save();
      })
    );

    const savedPost = await newPost.save();
    res.status(200).json({
      post: savedPost,
      message: "New post has been created!",
    });
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found!");
    res.status(200).json(post);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

// GET all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.category;
  try {
    let posts;
    username
      ? (posts = await Post.find({ username }))
      : categoryName
      ? (posts = await Post.find({
          categories: {
            $in: [categoryName],
          },
        }))
      : (posts = await Post.find());

    if (!posts) return res.status(404).json("No posts found!");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found!");
    if (post.username === req.body.username) {
      console.log("X");
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(`Error: ${err.message}`);
      }
    } else {
      return res.status(401).json("You can update only your posts!");
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found!");
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted!");
      } catch (err) {
        res.status(500).json(`Error: ${err.message}`);
      }
    } else {
      return res.status(401).json("You can delete only your posts.");
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

module.exports = router;
