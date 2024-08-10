const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (data) => {
    const { userName, email, password, roles } = data;
    const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
    });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    //PasswordHashing 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
          userName,
          email,
          password: hashedPassword,
          roles,
        },
        include: {
          roles: true, // Include roles in the response
        },
    });
    return newUser;
};

exports.login = async (data) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: { roles: true }
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
 
  const token = jwt.sign({ id: user.id, role: user.roles[0].name }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if(!passwordMatch){
    throw new Error('Authentication failed');
  }

  const newUser = await prisma.user.update({
    where: {
      id:user.id
    },
    data: {
      token: token,
    }
  });
  return newUser;
};
