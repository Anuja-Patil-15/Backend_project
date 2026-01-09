const db = require("../db/database");
const bcrypt = require("bcrypt");
const { checkEmailWithRole, checkContactWithRole, InsertUserData } = require("../db/drizzleHelper");

// Check all fields are filled
exports.Adduser = (req, res) => {
  const { role, name, contact, email, password } = req.body;

  if (!role || !name || !email || !password || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check email is already present for specific role
  const user = checkEmailWithRole(email, role);
  if (user) {
    return res.status(409).json({ message: "Email already exists" });
  }

  // Check contact is already present for specific role
  const result = checkContactWithRole(contact, role);
  if (result) {
    return res.status(409).json({ message: "Contact already exists" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Password hashing failed" });
    }

    // Add user details: Role, name, contact, email, Password
    const value = {
      role: role,
      name: name,
      contact: contact,
      email: email,
      password: hashedPassword
    };
    InsertUserData(value);

    res.status(201).json({ message: "User added successfully" });
  });
};
