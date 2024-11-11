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
        res.status(201).send({ message: 'Product created successfully', data: newProduct });

    } catch (error) {
      res.status(400).send({ message: 'Products not created successfully' });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getProduct = async (req, res) => {
    try {
        const allProducts = await prisma.product.findMany();
        console.log('Get product:', allProducts);
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(404).send({ message: 'Product not found' });
    } finally {
        await prisma.$disconnect();
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const newProduct = await prisma.product.update({
            data: req.body,
            where: {
                id: 4,
            }
        });
        res.status(200).send({ message: 'Product Updated successfully', data: newProduct });
    } catch (error) {
        res.status(404).send({ message: 'Product not found' });
    } finally {
        await prisma.$disconnect();
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const newProduct = await prisma.product.delete({
            where: {
                id: 2,
            }
        });
        res.status(200).send({ message: 'Product Deleted successfully', data: newProduct });
    } catch (error) {
        res.status(404).send({ message: 'Product not found' });
    } finally {
        await prisma.$disconnect();
    }
};


