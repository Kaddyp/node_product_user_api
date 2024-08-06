const express = require('express');
const router = express.Router();

// Products route
router.get('/', (req, res)=>{
    res.send('Welcome to User Route!')
});



module.exports = router;