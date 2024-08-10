const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserProfile = async (userId) => {
    const user = await prisma.user.findUnique({
      where: userId,
      include: { roles: true }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
};