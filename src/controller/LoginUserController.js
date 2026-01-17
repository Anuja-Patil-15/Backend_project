require("dotenv").config();
const bcrypt = require("bcrypt");
const { getDataByEmail } = require("../db/drizzleHelper");
const drizzleHelper = require("../db/drizzleHelper")
const jwt = require('jsonwebtoken');


const LoginController = {};

LoginController.login = async (req, res) => {
  console.log(process.env.SECRET_KEY)
  try {
    console.log("REQ BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const users = await drizzleHelper.getDataByEmail(email);

    if (!users || users.length === 0) {
      return res.status(401).json({ message: "Email does not exist" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.Role },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    console.log(token);

    return res.status(200).json({
      username: user.name,
      email: user.email,
      role: user.Role,
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
LoginController.logout=(req,res)=>{
  res.clearCookie("token",{
    httpOnly:true,
    sameSite:"lax",
    secure:false,
  });
   return res.status(200).json({
    message: "Logged out successfully",
  });
}
module.exports = LoginController;
