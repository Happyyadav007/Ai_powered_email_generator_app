const nodemailer = require("nodemailer");
const path = require('path');
const fs = require("fs");
require("dotenv").config();

const mailSender = async (to,subject,text,attachments) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: `${to}`,
            subject: `${subject}`,
            text: `${text}`,
            attachments,
        })
        console.log(info);
        attachments.forEach((file) => {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}
module.exports = mailSender;