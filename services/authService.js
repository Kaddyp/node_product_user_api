const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (data) => {
    const { userName, email, password, role } = data;
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
          roles : {
            "connectOrCreate": [
              {
                  "where": { "name": role },
                  "create": { "name": role }
              }
            ]
          },
        },
        include: {
          roles: true, // Include roles in the response
          tokens: true,
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
  // Delete any existing tokens for the user
  await prisma.token.deleteMany({
    where: { userId: user.id },
  });
  const token = jwt.sign({ id: user.id, role: user.roles[0].name }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if(!passwordMatch){
    throw new Error('Authentication failed');
  }
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);
  const newToken = await prisma.token.create({
    data: {
      token,
      expiresAt,
      user: { connect: { id: user.id } },
    },
  });
  
  return {token: token, userRole: user.roles[0].name, user};
};


exports.logout = async (data) => {
  const user = await prisma.token.deleteMany({
    where: { token: data },
  });
  return {user};
};
