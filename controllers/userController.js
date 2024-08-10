const userService = require('../services/userService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.body);
        res.status(200).send({message: 'Protected route accessed', data: user});
    } catch (error) {
        res.status(400).send({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};