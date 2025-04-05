const express = require('express');
const authRouter = require('./authRouter');
const validate = require('../middleware/validate');
const authValidation= require('../validations/auth.validation');

const router = express.Router();

router.use('/auth',validate(authValidation.register), authRouter);

module.exports = router;

