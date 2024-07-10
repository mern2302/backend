const express = require("express");
const dbConnection = require("./config/dbConnection");
const router = require("./route");
var cors = require("cors");
var bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);
dbConnection();
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
