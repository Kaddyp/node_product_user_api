import express from 'express';
const router = express.Router();

// Products route
router.get('/', (req, res)=>{
    res.json({
        products: [
            {title: "red Shirt"},
            {title: "blue Shirt"}
         ]
    });
});


export default router;