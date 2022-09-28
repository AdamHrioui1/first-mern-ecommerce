require('dotenv').config()
const nodemailer = require('nodemailer');

// error: Error: Missing credentials for "PLAIN"
// Google disabled less secure apps, to resolve the issue one need to setup  "Login with app password: https://support.google.com/mail/answer/185833?hl=en#zippy=%2Cwhy-you-may-need-an-app-password" and to allow the app password "setup two factor authentication: https://support.google.com/accounts/answer/185839"

async function wrapedSendMail(mailOptions) {
    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true, 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log("error: "+ err);
                resolve(false); // or use rejcet(false) but then you will have to handle errors
            } 
            else {
                console.log('Email sent successfuly!');
                resolve(true);
            }
        });
    })
}

module.exports = wrapedSendMail