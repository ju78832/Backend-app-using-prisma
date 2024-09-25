const jwt = require("jsonwebtoken");

const getToken = async (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  return token;
};

module.exports = getToken;
