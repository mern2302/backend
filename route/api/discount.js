const express = require("express");
const {discountController,getDiscountController} = require("../../controller/discountController");
const router = express.Router();

router.post("/creatediscount", discountController)
router.get("/getdiscount", getDiscountController)

module.exports = router;