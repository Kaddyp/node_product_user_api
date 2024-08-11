const authService = require('../services/authService.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
    try {
      console.log('register');
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
    console.log('Login');
    const user = await authService.login(req.body);
    // Send JWT via an HTTP-only cookie
    res.cookie('token', user.token, {
      httpOnly: true,
      secure: true,         //process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 300000,       // 5 Minutes
      sameSite: 'Strict',   // Helps protect against CSRF
    });
    res.status(200).send({message: 'Login successfully', data: user});
  } catch (error) {
    res.status(400).send({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};


exports.logout = async (req, res) => {
  try {
    console.log('logout');
    const user = await authService.logout(req.cookies.token);
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully'});
  } catch (error) {
    res.status(400).send({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};