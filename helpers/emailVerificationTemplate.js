function emailVerificationTemplate(token){
  return `<div><img alt=""src=https://i.ibb.co/kHGmT6y/Logo-2.png style=width:100px><h1 style="font-family:'DM Sans',sans-serif">Orebi Ecommerce</h1><p style="font-family:'DM Sans',sans-serif">please verify your email address</p> <a 
  href="http://localhost:3000/api/v1/authentication/emailverification/${token}" tyle="font-family:'DM Sans',sans-serif;background:#262626;padding:20px;color:#fff;border:none">Click for verification</a></div>`
}
module.exports = emailVerificationTemplate;