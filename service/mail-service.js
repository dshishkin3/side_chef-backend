const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sidechef.corp@gmail.com",
        pass: "hxkmscetsnlstbye",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "sidechef.corp@gmail.com",
      to,
      subject: `Account activation on the site ${process.env.API_URL}`,
      html: `
      <!DOCTYPE html>
<html>
<head>
 <title>Account activation</title>
 <style>
  body {
   font-family: Arial, sans-serif;
   margin: 0;
   padding: 20px;
  }
  h2 {
   color: #000;
   font-size: 24px;
   margin-top: 20px;
   text-align: center;
  }
  p {
   color: #000;
   font-size: 16px;
   line-height: 1.5;
   margin: 10px 0;
   text-align: center;
  }
  a {
   background-color: #007bff;
   border-radius: 4px;
   color: #fff !important;
   display: block;
   font-size: 16px;
   margin: 0 auto;
   margin-top: 20px;
   padding: 10px 20px;
   text-decoration: none;
   transition: background-color 0.3s ease;
   width: 200px;
   text-align:center
  }
  a:hover {
   background-color: #0062cc;
  }
 </style>
</head>
<body>
 <h2>Welcome to our side-chef!</h2>
 <p>To activate mail, please click on the link below:</p>
 <a href="${link}">Activate mail</a>
 <p>If the link doesn't work, copy and paste this line into your browser's address bar:</p>
 <a href="${link}" style="text-decoration:none; color:#15c !important; background-color:#fff;width:auto;margin-top:0px;">${link}</a>
 <p>Thank you for registering in our app!</p>
</body>
</html>
      `,
    });
  }
}

module.exports = new MailService();
