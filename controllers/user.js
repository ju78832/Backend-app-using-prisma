const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookietoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(401).json({ message: "please provide all fields" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    cookieToken(user, req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please provide email or password" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User not Found" });
    }

    if (user.password !== password) {
      res.status(402).json({ message: "password is incorrect" });
    }

    cookieToken(user, req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
