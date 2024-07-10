const express = require("express");
const {becomeMerchantController, getAllStoreController} = require("../../controller/merchantController");
const router = express.Router();

router.post("/becomemerchant", becomeMerchantController);
router.get("/allstore", getAllStoreController)

module.exports = router;
