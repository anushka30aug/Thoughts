const express = require('express');
const route = express.Router();
const otp = require('otp-generator');
const nodemailer = require("nodemailer");
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const S_key = process.env.SECRET_KEY;

route.post('/sendmail', async(req, res) => {
    let getOtp = otp.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "anushkashukla3003@gmail.com",
                pass: `${process.env.NODE_MAILER}`,
            },
        });
        const { emailId } = req.body;
        let info = await transporter.sendMail({
            from: '"Anushka shukla" <anushkashukla3003@gmail.com>', // sender address
            to: `${emailId}`, // list of receivers
            subject: "OTP for verfication ✔", // Subject line
            text: "Hello", // plain text body
            html: `<i> login OTP for your Thoughts account : <b> ${getOtp} <br/> valid for 59 seconds only </b> <br/> If it's not you then kindly do not share this OTP with anyone</i>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({otp : getOtp});
    }

    catch (err) {
        res.status(404).json({ error: 'unexpected error occured' })
    }
}
)

route.post('/verifyEmail', [body('emailId').isEmail().withMessage("enter valid email")],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: 'enter valid credentials' });
        }
        try {
            const { emailId } = req.body;
            const user = await User.findOne({email:emailId })
            if (!user) {
                return res.status(404).json({ notFound: "Sign up required" })
            }
            else {
                return res.status(200).json({ success: "found" })
            }
        }
        catch (err) {
            res.status(404).json({ error: "unexpected error occured" })
        }

    })


    route.post('/setpassword',async(req,res)=>{
        const { emailId ,password }=req.body;
        try{
        const user = await User.findOne({email:emailId });
        const id = user._id;

        const salt = await bcrypt.genSalt(5);
        const hashed = await bcrypt.hash(password, salt)

         const newdata = {}
         newdata.password = hashed;

         const updated = await User.findByIdAndUpdate(id, { $set: newdata }, { new: true });

        if (updated)
        {
            const data = {
                id: id
            }
            const token = jwt.sign(data, S_key);
            res.json({ token })
        }
        else {
            res.status(401).json({ error: 'can\'t update note' });
        }
    }
    catch(err)
    {
        res.status(400).json({ error: 'an unexpected error occured' })
    }
    })
    module.exports=route
