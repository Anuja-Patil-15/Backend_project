const bcrypt = require("bcrypt");
const { getDataByEmail } = require("../db/drizzleHelper");

exports.login = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const users = await getDataByEmail(email); // returns array
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: "Email does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Success response
    res.status(200).json({
      username: user.name,
      email: user.email,
      role: user.Role,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
