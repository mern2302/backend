const nodemailer = require("nodemailer");
async function sendEmail(email,subject,template){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mern2301cit@gmail.com",
          pass: "ojiuteemrzsrfnxf",
        },
      });

      const info = await transporter.sendMail({
        from: 'OREBI', 
        to: email, 
        subject: subject,
        html: template, 
      });
}
module.exports = sendEmail;