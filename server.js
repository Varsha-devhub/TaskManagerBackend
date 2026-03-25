require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db")
const authRoutes=require("./routes/authRoutes")
const taskRoutes=require("./routes/taskRoutes")

const app=express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);
app.get("/",(req,res)=>{
    res.send("Auth Backend is Running");

})
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
