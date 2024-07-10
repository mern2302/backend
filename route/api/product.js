const express = require("express");
const {
  createProductController,
  secureProductUploadController,
  createvariantController,
  getAllProductController,
  deleteProductController,
  getAllVariantController
} = require("../../controller/productController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
  },
});

const upload = multer({ storage: storage });

// router.post(
//   "/createproduct",
//   secureProductUploadController,
//   createProductController
// );
router.post(
  "/createproduct",
  createProductController
);
router.post("/createvariant", upload.single("image"), createvariantController);
router.get("/allproduct", getAllProductController);
router.post("/deleteproduct", deleteProductController);
router.get("/allvariant", getAllVariantController)

module.exports = router;
