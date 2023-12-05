const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require("path");
////////////////////////////////////

// middleware for cors
app.use(cors(corsOptions));

// middleware for accept json() inside request
app.use(express.json());

// serve static fles
app.use(express.static(path.join(__dirname, "public")));

/////////////////////////
// routes

// register & login route
app.use("/api/auth", require("./routes/auth"));

// user get, delete update route
app.use("/api/users", require("./routes/users"));

// post get, create, update, delete route
app.use("/api/posts", require("./routes/posts"));

//adding category route  (post)
app.use("/api/categories", require("./routes/categories"));

// adding image route
app.use("/api/upload", require("./routes/photos"));

// Catch-all route for handling 404 errors
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});
////////////////////////////////////
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
/////////////////////////////////////

////////////////////////
// listening to PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
