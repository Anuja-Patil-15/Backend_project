const bcrypt = require("bcrypt");
const drizzleHelper=require("../db/drizzleHelper")
const AddUser={}
AddUser.Adduser = async (req, res) => {
  try {
    const { role, name, contact, email, password } = req.body;

    if (!role || !name || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check email
    const emailExists = await drizzleHelper.checkEmailWithRole(email, role);
    if (emailExists.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // check contact
    const contactExists = await drizzleHelper.checkContactWithRole(contact, role);
    if (contactExists.length > 0) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await drizzleHelper.InsertUserData({
      role,
      name,
      contact,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: "User added successfully" });

  } catch (err) {
    console.error("Add user error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports=AddUser;
