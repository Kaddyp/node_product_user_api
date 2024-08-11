const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserProfile = async (data) => {
  const { id } = data;
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: { roles: true }
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};