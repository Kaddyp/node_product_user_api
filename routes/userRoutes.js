import express from 'express';
const router = express.Router();

// Products route
router.get('/', (req, res)=>{
    res.send('Welcome to User Route!')
});


export default router;