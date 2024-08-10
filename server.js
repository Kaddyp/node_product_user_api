const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
require('dotenv').config();
const routes  = require('./routes');

// Port Number Setup 
const PORT = process.env.APP_PORT || 3000;
// Express Server Setup  & JSON Middleware  Setup  (for parsing JSON data)  // Importing dotenv for environment variables setup  (optional)
const app = express();
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per windowMs   
});
app.use(limiter);
// const options = {
//     key: fs.readFileSync('/path/to/private-key.pem'),
//     cert: fs.readFileSync('/path/to/certificate.pem')
// };
app.get('/', (req, res)=>{
    res.send('API is running...');
})

// only requests to /api/* will be sent to our "router"
app.use('/api', routes);
app.listen(PORT, (error)=>{
    if(error) throw error;
    console.log("Server created Successfully on PORT :", PORT);
});