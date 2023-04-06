require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routers");
const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
if (env !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
