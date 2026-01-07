exports.Adduser = (req, res) => {
  const { role, name, contact, email, password } = req.body;

  const checkSql = "SELECT id FROM users WHERE email = ? AND Role = ?";
  db.query(checkSql, [email, role], (err, result) => {
    if (result.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const insertSql =
      "INSERT INTO users (Role, name, contact, email, Password) VALUES (?, ?, ?, ?, ?)";
    db.query(insertSql, [role, name, contact, email, password], () => {
      res.status(201).json({ message: "User added successfully" });
    });
  });
};