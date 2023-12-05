const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

module.exports = router;
