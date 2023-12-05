const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Add new category
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  if (!newCategory) return res.status(400).json("Category must be provided!");
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

// get all categories
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.find();
    if (!allCategories) return res.status(404).json("No category found!");
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

module.exports = router;
