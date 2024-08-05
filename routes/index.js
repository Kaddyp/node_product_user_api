import express from 'express';
import productsRoutes from './productsRoutes.js';
import userRoutes from './userRoutes.js';
const router = express.Router();

router.use('/products', productsRoutes);
router.use('/user', userRoutes);

export default router;