const Categorylist = require("../models/categorySchema");
const SubcategoryList = require("../models/subCategorySchema");

//CREATE CATEGORY CONTROLLER
async function createCategoryController(req, res) {
  const { name, description } = req.body;
  console.log(name, description);

  const duplicateCategory = await Categorylist.find({ name });
  console.log(duplicateCategory);
  if (duplicateCategory.length > 0) {
    return res.json({ error: "This category already in exists" });
  }

  const category = new Categorylist({
    name,
    description,
  });
  category.save();
  res.json({ success: "Category create successfully done" });
}

//CREATE CATEGORY STATUS CONTROLLER

async function createCategoryStatusController(req, res) {
  console.log("ami status");
  const { name, status } = req.body;

  console.log(name, status);
  if (status == "waiting" || status == "rejected") {
    const updatedCategoryStatus = await Categorylist.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status: status } },
      { new: true }
    );
    res.json({ success: "Category status Updated" });
  } else if (status == "approved") {
    const updatedCategoryStatus = await Categorylist.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status: status } },
      { new: true }
    );
    res.json({ success: "Category status Updated" });
  }
}

//CREATE SUB CATEGORY CONTROLLER
async function createSubCategoryController(req, res) {
  const { name, description, category } = req.body;
  const duplicateSubCategory = await SubcategoryList.find({ name });
  console.log(duplicateSubCategory);
  if (duplicateSubCategory.length > 0) {
    return res.json({ error: "This category already in exists" });
  }

  const subcategory = new SubcategoryList({
    name,
    description,
    category,
  });
  subcategory.save();
  await Categorylist.findOneAndUpdate(
    { _id: subcategory.category },
    { $push: { subcategory: subcategory._id } },
    { new: true }
  );
  res.json({ success: "Sub Category create successfully done" });
}

//CREATE SUB CATEGORY STATUS CONTROLLER

async function createSubCategoryStatusController(req, res) {
  console.log("ami status");
  const { name, status } = req.body;

  console.log(name, status);
  if (status == "waiting" || status == "rejected") {
    const updatedSubCategoryStatus = await SubcategoryList.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status: status } },
      { new: true }
    );
    res.json({ success: "SubCategory status Updated" });
  } else if (status == "approved") {
    const updatedSubCategoryStatus = await SubcategoryList.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status: status } },
      { new: true }
    );
    res.json({ success: "SubCategory status Updated" });
  }
}

async function getAllCategoryController(req, res) {
  console.log("all");
  const category = await Categorylist.find({}).populate("subcategory");
  res.send(category);
}

async function getAllSubCategoryController(req, res) {
  console.log("all");
  const category = await SubcategoryList.find({});
  res.send(category);
}

module.exports = {
  createCategoryController,
  createSubCategoryController,
  createCategoryStatusController,
  createSubCategoryStatusController,
  getAllCategoryController,
  getAllSubCategoryController,
};
