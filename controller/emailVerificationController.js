var jwt = require('jsonwebtoken');
const UserList = require('../models/userSchema');

async function emailVerficationController(req,res){
    const {authorization} = req.headers;
    console.log(authorization);
    var decoded = jwt.verify(authorization, 'baig');
    console.log(decoded.email);
    const updateUser = await UserList.findOneAndUpdate(
        { email: decoded.email },
        { verified: true},
        {new: true}
        )
    res.json(updateUser)
}


async function verificationController(req,res){
  const {id} = req.params
  var decoded = jwt.verify(id, 'baig');
  console.log(decoded);
  if(decoded){
    const updateUser = await UserList.findOneAndUpdate(
        { email: decoded.email },
        { verified: true},
        {new: true}
        )
       res.redirect("http://localhost:5173/login")
  }
}

module.exports = {emailVerficationController, verificationController};