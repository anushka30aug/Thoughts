const express = require('express');
// express validator is used to check if the entered value are valid or not ...... for maintaining data integrity and consistency 
const { body, validationResult } = require('express-validator');
// bcrypt is a package for password hashing for data security
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const route = express.Router();
// import the schema / model in which data needed to be entered by user
const User = require('../Model/User');
const fetchUser=require('../middleWare/fetchUser');
// number of salt characters to be added in password at the time of password hashing
const saltRounds = 10;
const S_key = process.env.SECRET_KEY;


route.post('/signup',
    [body('name').isLength({ min: 3 }).withMessage("enter valid name"),
    body('email').isEmail().withMessage("enter valid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be of atleast 6 characters")]
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() } );
        }
        try {
            // to check if user already exist in DB
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(404).json({alreadyExist:'already exist'});
            }
            //  if user doesn't already exist then create new user
            const salt = await bcrypt.genSalt(saltRounds);
            const hashed = await bcrypt.hash(req.body.password, salt);
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashed
            }).then(
                (user) => {
                    const data = {
                        id: user._id
                    }
                    const token = jwt.sign(data, S_key);
                    res.json({ token })
                }
            )
        }
        catch (error) {
            res.json({error:'an unexpected error occured'});
        }

    })

route.post('/login', [ body('email').isEmail().withMessage("enter valid email"),
body('password').isLength({ min: 6 }).withMessage("Password must be of atleast 6 characters")],
 async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: 'enter valid credentials' }      );
    }
    try{
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({notFound:"Sign up required"})
    }

    const pasCompare = await bcrypt.compare(password, user.password);

    if (!pasCompare) {
        return res.status(401).json({errors:'enter valid credentials'});
    }

    const data = {
        id: user._id
    }
    const token = jwt.sign(data, S_key);
    res.json({ token })
}
 catch(err)
 {
    res.status(404).json({error:'unexpected error occured'})
 }

})

route.post('/userInfo',fetchUser,async(req,res)=>{
    try{
        const id = req.user.id;
        const data = await User.findById(id).select("-password"); 
        res.json(data);
    }
    catch(err)
    { 
        res.status(500).json(err);
    }
})


module.exports = route;

