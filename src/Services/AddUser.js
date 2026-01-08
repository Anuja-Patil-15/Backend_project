const db = require("../db/database");
const bcrypt = require("bcrypt");

exports.Adduser = (req, res) => {
  const { role, name, contact, email, password } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkSql = "SELECT id FROM users WHERE email = ? AND Role = ?";
  db.query(checkSql, [email, role], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Password hashing failed" });
      }

      const insertSql =
        "INSERT INTO users (Role, name, contact, email, Password) VALUES (?, ?, ?, ?, ?)";

      db.query(
        insertSql,
        [role, name, contact, email, hashedPassword],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Insert failed" });
          }

          res.status(201).json({ message: "User added successfully" });
        }
      );
    });
  });
};
