require("dotenv").config();
const jwt = require("jsonwebtoken");


// middleware to verify token

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(process.env.SECRET_KEY)
  // token missing
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // verify token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // attach decoded user to request
    req.user = decoded; // id, email, role
    next();
  });
};

module.exports = verifyToken;
