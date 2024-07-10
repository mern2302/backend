const mongoose = require("mongoose");
function dbConnection() {
  mongoose
    .connect(
      "mongodb+srv://citmern2302:mern2302@cluster0.tvklsje.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected!"));
}

module.exports = dbConnection;
