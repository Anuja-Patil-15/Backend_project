const express = require("express");
const router = express.Router();
const adminController = require("../controller/AdminController");

const AddUser=require("../Services/AddUser")

router.post("/add", AddUser.Adduser);
router.get("/display", adminController.display);
router.get("/:id", adminController.getUserById);
router.put("/edit/:id", adminController.update);
router.put("/resetpassword/:id",adminController.changepassword);






module.exports = router;
