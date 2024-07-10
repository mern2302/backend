const productSchema = require("../models/productSchema");
const UserList = require("../models/userSchema");
const variantSchema = require("../models/variantSchema");

async function secureProductUploadController(req, res, next) {
  const userid = req.headers.authorization.split("@")[1];
  const password = req.headers.authorization.split("@")[2];

  if (!req.headers.authorization) {
    return res.json({ error: "AUTHORIZATION FAILED" });
  }
  const user = await UserList.find({ _id: userid });
  if (user.length > 0) {
    if (password == "?94Nup23eiU+") {
      if (user[0].role == "merchant") {
        next();
      } else {
        return res.json({ error: "You r not able to product upload" });
      }
    } else {
      return res.json({ error: "Password is not matched" });
    }
  } else {
    return res.json({ error: "USER IS NOT FOUND" });
  }
}

function createProductController(req, res) {
  const { name, description, store } = req.body;

  const product = new productSchema({
    name,
    description,
    store,
  });
  product.save();
  res.json({ success: "Product Create Successful" });
}

async function createvariantController(req, res) {
  const { image, storage, ram, color, size, price, quantity, product } =
    req.body;
  console.log("mostofa", req.file);
  const variant = new variantSchema({
    image: `http://localhost:3000/uploads/${req.file.filename}`,
    storage,
    ram,
    color,
    size,
    price,
    quantity,
    product,
  });
  variant.save();
  console.log(variant.product);
  await productSchema.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } },
    { new: true }
  );
  res.json({ success: "Variant Create Successful" });
}

async function getAllProductController(req, res) {
  const data = await productSchema.find({}).populate("store");
  res.send(data);
}

async function deleteProductController(req, res){
  const data =await productSchema.findByIdAndDelete(req.body.id)
  res.send({success: "product delete successfully"})
}

async function getAllVariantController(req,res){
  const data = await variantSchema.find({});
  res.send(data)
}
module.exports = {
  secureProductUploadController,
  createProductController,
  createvariantController,
  getAllProductController,
  deleteProductController,
  getAllVariantController
};
