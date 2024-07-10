const bcrypt = require('bcrypt');
const emailValidation = require("../helpers/emailValidation");
const UserList = require('../models/userSchema');
const sendEmail = require('../helpers/sendEmail');
const emailVerificationTemplate = require('../helpers/emailVerificationTemplate');
var jwt = require('jsonwebtoken');


async function registrationController(req,res){
    const { firstName, lastName, email, telephone, addressOne, addressTwo, city, postCode, division, district, password } = req.body;

  if (!firstName || !lastName) {
    return res.json({ error: "FirstName and LastName is required" })
  }

  if (!email) {
    return res.json({ error: "Email is required" });
  }

  if (!emailValidation(email)) {
    return res.json({ error: "Email is not valid" });
  }

  const existingEmail = await UserList.find({ email });
  if (existingEmail.length > 0) {
    return res.json({ error: "Email is in already used" })
  }
 var token = jwt.sign({ email }, 'baig');
  bcrypt.hash(password, 10, function (err, hash) {
    const users = new UserList({
      firstName,
      lastName,
      email,
      telephone,
      addressOne,
      addressTwo,
      city,
      postCode,
      division,
      district,
      password: hash,
      token: email
    })
    users.save();
    // var token = jwt.sign({ email }, 'baig');
    sendEmail(email, 'EMAIL VERIFICATION', emailVerificationTemplate(token))
  });

  res.json({success: "Registration Successfully done"});
}

module.exports = registrationController;