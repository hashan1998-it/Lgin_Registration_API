const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const verify = jwt.verify(token, process.env.SECRET_MSG);
    req.user = verify;
  } catch (error) {
    res.status(400).send("Invalid token");
  }
  next();
};

module.exports = { auth };
