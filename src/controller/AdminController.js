const db = require("../db/database");
const bcrypt=require("bcrypt");
const {displayAll,getUserByid,updateDataWithPassword,updateData}=require("../db/drizzleHelper")


//Display all user on desktop
exports.display = (req, res) => {
   const result=displayAll();
    return res.json(result);

   };


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserByid(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//update users information
exports.update = (req, res) => {
  const { role, name, contact, email, password } = req.body;
  const { id } = req.params;

 
  //password is updated if new password is provided if the password not provide then remain old password
  if (password && password.trim() !== "") {
  
    updateData(role,name,email,contact,id)
    
  } else {
    const hashedPassword=bcrypt.hash(password, 10);
    updateDataWithPassword(role,name,email,contact,hashedPassword,id)
  }


};



