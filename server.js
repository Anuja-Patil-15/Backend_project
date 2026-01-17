require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const verifyToken = require("./src/middleware/authmiddleware");

const userRoutes = require("./src/Routes/UserRoute");
const adminRoutes = require("./src/Routes/AdminRoute");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use("/user", userRoutes);

//  Protect admin routes
app.use("/admin", verifyToken, adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
