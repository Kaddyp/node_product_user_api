const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//CRUD-Products
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await prisma.product.create({
        data: req.body,
            include: {
                categories: true, 
            },
        });
        console.log('Created product:', newProduct);
        res.status(200).send({ message: 'Product created successfully', data: newProduct });

    } catch (error) {
      res.status(404).send({ message: 'Products not created successfully' });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getProduct = async (req, res) => {
    try {
        const allUsers = await prisma.product.findMany();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).send({ message: 'Product not found' });
    }
};
/*exports.updateProduct = async (req, res) => {
    try {
        res.status(200).json({
                product: {title: "blue Shirt"}
        });
    } catch (error) {
        res.status(404).send({ message: 'Product not found' });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        res.status(200).json({
                product: {title: "red Shirt"}
        });
    } catch (error) {
        res.status(404).send({ message: 'Product not found' });
    }
};*/


