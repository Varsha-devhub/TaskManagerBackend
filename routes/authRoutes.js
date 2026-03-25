const express=require("express");
const router=express.Router();
const protect=require("../middleware/protect")
const {registerUser,loginUser, changePassword, forgotPassword, resetPassword}=require("../controllers/authController");
router.post("/register",registerUser);
router.get("/profile",protect,(req,res)=>{
    res.json(req.user);
});
router.post("/login",loginUser);
router.put("/change-password",protect,changePassword);
router.post("/forgot-password",forgotPassword);
router.put("/reset-password/:token",resetPassword)

module.exports=router;