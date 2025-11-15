import User from "../models/User.js";
import transporter from "../config/mailer.js";

export const saveUser = async(req, res) =>{
    try{
        const {given_name, family_name, sub, email, password} = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { given_name, family_name, sub, password },
            { new: true, upsert: true }
        );

        // Send email after successful registration/login
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: user.createdAt === user.updatedAt ? 'Registration Successful' : 'Login Successful',
            text: user.createdAt === user.updatedAt
                ? `Thank you, ${given_name}, you are successfully registered!`
                : `Hello ${given_name}, you are successfully logged in!`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json(user);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}