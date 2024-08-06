const express = require('express');
require('dotenv').config();
const routes  = require('./routes');

// Port Number Setup 
var PORT = process.env.APP_PORT || 3000;
// Express Server Setup  & JSON Middleware  Setup  (for parsing JSON data)  // Importing dotenv for environment variables setup  (optional)
const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('API is running...');
})

// only requests to /api/* will be sent to our "router"
app.use('/api', routes);
app.listen(PORT, (error)=>{
    if(error) throw error;
    console.log("Server created Successfully on PORT :", PORT);
});