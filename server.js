const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const routes  = require('./routes');

// Port Number Setup 
const PORT = process.env.APP_PORT || 3000;

// Express Server Setup  & JSON Middleware  Setup  (for parsing JSON data)  
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend's URL
    credentials: true
}));
  
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per windowMs   
});
app.use(limiter);

app.get('/', (req, res)=>{
    res.send('API is running...');
})

// only requests to /api/* will be sent to our "router"
app.use('/api', routes);

app.listen(PORT, (error)=>{
    if(error) throw error;
    console.log("Server created Successfully on PORT :", PORT);
});