const discountSchema = require("../models/discountSchema");

function discountController(req, res){
   const { cash, percent, flat, category, subcategory, product} = req.body;
   if(cash, product){
    const discount = new discountSchema({
      cash, 
      product
     })
     discount.save()
   }else if(cash, category){
    const discount = new discountSchema({
      cash, 
      category
     })
     discount.save()
   }
  //  const discount = new discountSchema({
  //   cash, 
  //   percent, 
  //   flat, 
  //   category, 
  //   subcategory, 
  //   product
  //  })
  //  discount.save()
   res.json({success: "Discount create successful"})
}


async function getDiscountController(req,res){
  const data = await discountSchema.find({}).populate(["product", "category", "subcategory"])
  res.send(data)
}

module.exports = {discountController, getDiscountController}