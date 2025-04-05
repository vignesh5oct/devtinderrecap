const express = require('express');
const router = express.Router();
const User = require("../models/user.model")

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
