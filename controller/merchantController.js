const merchantSchema = require("../models/merchantSchema");
const UserList = require("../models/userSchema");

async function becomeMerchantController(req, res) {
  const { storename, officialemail, officialphone, address, owner, products } =
    req.body;
  const merchant = new merchantSchema({
    storename,
    officialemail,
    officialphone,
    address,
    owner,
    products,
  });

  merchant.save();
  await UserList.findByIdAndUpdate(
    { _id: owner },
    { role: "merchant" },
    { new: true }
  );
  res.json({ success: "Congratulations. You r become e Merchant" });
}

async function getAllStoreController(req, res){
  console.log("stoere");
  const data = await merchantSchema.find({})
  res.send(data)
}
module.exports = {becomeMerchantController, getAllStoreController};
