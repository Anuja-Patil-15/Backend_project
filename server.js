const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(express.json())
app.set("strict routing", false);

const userRoutes = require("./src/Routes/UserRoute");
const adminRoutes=require("./src/Routes/AdminRoute")


app.use(cors());
app.use(express.json()); 


app.use("/user", userRoutes);
app.use("/admin",adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
