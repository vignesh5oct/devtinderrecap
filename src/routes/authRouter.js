const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    user = req.body;
    res.status(201).json({
        message: 'User registered successfully',
        user,
    });
});


module.exports = router;