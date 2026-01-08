const db = require("../db/database");
const bcrypt=require("bcrypt")



exports.display = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
    const user=result;
   
  });


  
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  });
};


exports.update = (req, res) => {
  const { role, name, contact, email, password } = req.body;
  const { id } = req.params;

  let sql;
  let values;

  if (password && password.trim() !== "") {
    sql = `
      UPDATE users
      SET Role = ?, name = ?, contact = ?, email = ?, Password = ?
      WHERE id = ?
    `;
    values = [role, name, contact, email, password, id];
  } else {
    sql = `
      UPDATE users
      SET Role = ?, name = ?, contact = ?, email = ?
      WHERE id = ?
    `;
    values = [role, name, contact, email, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated successfully" });
  });
};



