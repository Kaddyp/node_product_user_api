const authService = require('../services/authService.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.status(200).send({message: 'User registered successfully', data: user});
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      await prisma.$disconnect();
    }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    res.status(200).send({message: 'Login successfully', data: user});
  } catch (error) {
    res.status(400).send({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};