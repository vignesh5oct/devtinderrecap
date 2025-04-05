<!-- Packages -->
npm init
npm install express mongodb mongoose validator nodemon dotenv 

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


<!-- @@@@@@@@@@@@@@@@@@@@@@@@   2. Adding Routers  @@@@@@@@@@@@@@@@@@@@@@@@-->

1 . Create Routes folder

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

<!-- 2 -->
<!-- Add index.js file  Basic Router  -->
<!-- Create router object and use 'use' middleware to append the path and export router object -->

const express = require('express');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/auth', authRouter);

module.exports = router;

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


