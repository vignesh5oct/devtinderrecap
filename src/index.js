const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

//DB connection
const connectDB = require('./config/config');

// Port configuration
const PORT = process.env.PORT || 5000;

// App listener
connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})


