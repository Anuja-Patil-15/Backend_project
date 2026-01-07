const express = require("express");
const router = express.Router();
const adminController = require("../controller/AdminController");
const LoginController=require("../controller/LoginUserController")
const AddUser=require("../Services/AddUser")

router.post("/add", AddUser.Adduser);
router.get("/display", adminController.display);
router.post("/login", LoginController.login);   
router.put("/edit/:id", adminController.update);
router.get("/:id", adminController.getUserById);





module.exports = router;
