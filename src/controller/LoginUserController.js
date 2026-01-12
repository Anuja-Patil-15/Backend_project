const bcrypt = require("bcrypt");
const { getDataByEmail } = require("../db/drizzleHelper");
const drizzleHelper=require("../db/drizzleHelper")
const LoginController={};
LoginController.login = async (req, res) => {
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
module.exports=LoginController;
