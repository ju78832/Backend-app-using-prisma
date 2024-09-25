const prisma = require("../prisma/index");
const cookietoken = require("../utils/cookietoken");

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    cookietoken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};
