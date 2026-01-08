const db = require("../db/database");
const bcrypt = require("bcrypt");

exports.Adduser = (req, res) => {
  const { role, name, contact, email, password } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

 
  const emailSql = "SELECT id FROM users WHERE email = ? AND Role = ?";
  db.query(emailSql, [email, role], (err, emailResult) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (emailResult.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

   
    const contactSql = "SELECT id FROM users WHERE contact = ? AND Role = ?";
    db.query(contactSql, [contact, role], (err, contactResult) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (contactResult.length > 0) {
        return res.status(409).json({ message: "Contact already exists" });
      }

     
      bcrypt.hash(password, 10, (err, hashedPassword) => {
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
  });
};
