const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const sendEmail = require("../config/utils/sendEmail");
const { options } = require("../routes/authRoutes");

const registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        if (!email || !password || !name) {
        return res.status(400).json({
            message: "All fields are required"
  });
}
        if (!password || password.length < 6) {
         return res.status(400).json({
         message: "Password must be at least 6 characters"
  });
}
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(401).json({message:"User already exists"});
        }
       
        
        const user=await User.create({
            name,
            email,
            password
        });
        await user.save();
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"});
           }
           const token=jwt.sign(
            {id:user._id},process.env.JWT_SECRET,{"expiresIn":"1d"}
           );
             res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token
            });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"error.message"});
    }
}
const changePassword=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        const {currentPassword,newPassword}=req.body;
        if(!currentPassword || !newPassword){
            return res.status(400).json({message:"All fields are required"})
        }
        const isMatch=await bcrypt.compare(currentPassword,user.password);
        if(!isMatch){
            res.status(400).json({message:"Current password incorrect"})
        }
        
        user.password=newPassword;
        await user.save();
        res.json({message:"Password updated Successfully"})

        
    }catch(error){
        
        res.status(500).json({message:"Server error"})
    }
}
const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
           return res.status(404).json({message:"User not found"});
        }
        const resetToken=crypto.randomBytes(32).toString("hex");
        const hashedToken=crypto.createHash("sha256")
                                .update(resetToken)
                                .digest("hex");

        user.resetPasswordToken=hashedToken;
        user.resetPasswordExpire=Date.now()+10*60*1000;
        await user.save();
        
        const resetUrl=`http://localhost:5173/reset-password/${resetToken}`;
        const message=
       `
            <h3>Password Reset</h3>
            <p>Click the button below:</p>
            <a href="${resetUrl}" 
            style="display:inline-block; padding:10px 15px; background:#4CAF50;
            color:white; text-decoration:none; border-radius:5px;"
            >Reset Password</a>
            `;
        

        try{
              await sendEmail({
            email:user.email,
            subject:"Password Reaset",message
        });
        res.json({
            message:"Reset token generated,Email sent successully",
            
        })
        }catch(error){
            console.log(error);
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save();
            res.status(500).json({message:"Email failed to send"})
        }
      
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}
const resetPassword=async(req,res)=>{
    try{
        const {token}=req.params;
        const {password}=req.body;
        const hashedToken=crypto.createHash("sha256")
                                .update(token)
                                .digest("hex");
        const user=await User.findOne({resetPasswordToken:hashedToken,
            resetPasswordExpire:{$gt:
                        Date.now()
            }
        });
        if(!user){
            return res.status(400).json({message:"Invalid or expired token"});
        }
        user.password=password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        res.json({message:"Password reset successful"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}
module.exports={registerUser,loginUser,changePassword,forgotPassword,resetPassword}