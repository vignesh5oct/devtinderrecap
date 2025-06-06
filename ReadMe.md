<!-- Packages -->
npm init
npm install express mongodb mongoose validator nodemon dotenv joi http-status jsonwebtoken

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<!-- Database connection function -->
<!-- config/config.js -->

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

<!-- This function connects to a MongoDB database using Mongoose. -->
console.log(`MongoDB URI: ${process.env.MONGODB_URL}`);

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = connectDB;


<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<!-- Inital Setup -->
<!-- src/app.js  -->
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

module.exports = app;

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<!-- Main File src/index.js -->
const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

<!-- DB connection -->
const connectDB = require('./config/config');

<!-- Port configuration -->
const PORT = process.env.PORT || 5000;

<!-- App listener -->
connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})


<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   2. Adding Routers  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

1. Create Routes folder

<!-- 1 -->
<!-- Add new Router File  'authRouter'  -->
<!-- Create router object and add CRUD Methods  and export router object -->

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
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->


2. Add index.js in router
<!-- 2 -->
<!-- Add index.js file  Basic Router  -->
<!-- Create router object and use 'use' middleware to append the path and export router object -->

const express = require('express');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/auth', authRouter);

module.exports = router;
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

3. Update app.js
<!-- 3 -->
<!-- In the APP File ======>  src/app.js  -->
<!-- Add the  New Router File and Add to Middleware to append to all the routes -->

const express = require('express');

<!-- New Router File -->
const routes = require('./routes/index');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());


<!-- Add to Middleware to append to all the routes -->
app.use('/v1', routes);

module.exports = app;

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   2. Adding Joi Validation middlware and using Util files ApiError,pick  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

<!-- Add new Folder  'validations'  -->

1. Create a auth.validation.js

<!-- Import Joi -->
const Joi = require('joi');

<!-- Add Validations for Register Schema -->
const register = Joi.object({
    body:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(7).required(),
    })
})

<!-- Export the schema -->
module.exports = { register }

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

2. Add new folder middleware and create validate.js

const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

<!-- Perform Validation and value is passed to next() only validation are true -->
const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

3. Under router directory --> index.js

const express = require('express');
const authRouter = require('./authRouter');

<!-- Add those files -->
const validate = require('../middleware/validate');
const authValidation= require('../validations/auth.validation');

const router = express.Router();

<!-- Add middleware after path  -->
router.use('/auth',validate(authValidation.register), authRouter);

module.exports = router;

<!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->



