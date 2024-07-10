const emailValidation = require("../helpers/emailValidation");
const UserList = require("../models/userSchema");
const bcrypt = require('bcrypt');

async function loginController(req,res){
    const { email, password} = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    if (!emailValidation(email)) {
        return res.status(400).json({ error: "Email is not valid" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const existingEmail = await UserList.find({ email });
  if (existingEmail.length > 0) {
    bcrypt.compare(password, existingEmail[0].password).then(function(result) {
      if(result){
        res.json({
          success: 'Login Successful',
          email: existingEmail[0].email,
          role: existingEmail[0].role
        })
      }else{
        res.json({error: "Password not match"})
      }
  });
  }
}
module.exports =loginController