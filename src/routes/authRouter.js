const express = require('express');
const router = express.Router();
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    userData = req.body;
    const newUser = new User(userData);
    try {
        await newUser.save();
    } catch (error) {
        res.status(400).send('Error registering user'+ error);
    }
    res.status(201).json({
        message: 'User registered successfully',
        userData: newUser,
    });
});

router.post('/login', async (req, res) => {
    userData = req.body;

    console.log(process.env.JWT_SECRET+" process.env.JWT_SECRET");
    
    try {
        userFound = await User.findOne({email:userData.email})
        if(userFound){
            const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
                expiresIn: 86400 
            });
            res.cookie('token',token)
            res.status(200).json({
                message: 'User logged in successfully',
                token: token,
            });
        }
    } catch (error) {
        res.status(400).send('Error Login user'+ error);
    }
   
});



module.exports = router;


// app.post('/register', async (req, res) => {
//     const userData = req.body;
//     const user =  new User(userData);
//     try {
//         await user.save();
        
//     } catch (error) {
//         res.status(400).send('Error registering user'+ error);
//     }
//     res.send('Registered');
// });
