const db = require("../db/database");
const bcrypt=require("bcrypt");

const drizzleHelper=require("../db/drizzleHelper");
const adminController={};


//Display all user on desktop
adminController.display =async (req, res) => {
   const result=await drizzleHelper.displayAll();
    return res.json(result);

   };

//for edit get element by id
adminController.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await drizzleHelper.getUserByid(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//update users information
adminController.update = async (req, res) => {
  try {
    const { role, name, email, contact } = req.body;
    const { id } = req.params;
      await drizzleHelper.updateData(role, name, contact, email, id);
    res.status(200).json({ message: "User updated successfully" });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
adminController.changepassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.params;

   
    const hashedPassword = await bcrypt.hash(password, 10);
    await drizzleHelper.resetPassword(hashedPassword, id);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.json({ message: "Reset password error" });
  }
};

module.exports=adminController;


