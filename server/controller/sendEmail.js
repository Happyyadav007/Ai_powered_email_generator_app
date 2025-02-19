const mailSender = require("../utils/mailSender");


exports.sendEmail = async(req, res) =>{
    try{
    console.log("Request received:", req.body);
    const {to, subject, text} = req.body;
    const attachments = req.files?.map((file) => ({
        filename: file.originalname,
        path: file.path,
    })) || [];
    console.log(to);
    console.log('All:', to,subject,text,attachments);
    await mailSender(to, subject, text, attachments);
    res.status(200).json({
        message:'Email Sent Successsfully',
        succcess:true,
    })
    }
    catch(error)
    {
        return res.status(500).json({
            message: "Error sending email",
            message: error.message
        })
    }
}