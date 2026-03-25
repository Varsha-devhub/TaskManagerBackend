const Task=require("../models/Task");
 const createTask=async(req,res)=>{
    try{
        const task=new Task({
            title:req.body.title,
            user:req.user.id
        })
        await task.save();
        res.status(201).json(task);
    }catch(error){
        res.status(500).json({message:"Error in  creating task"});
    }
    
    
}

const getTasks=async(req,res)=>{
        try{
            const tasks=await Task.find({user:req.user._id}).sort({createdAt:-1});
            res.json(tasks)
        }catch(error){
        res.status(500).json({message:"Error in fetching tasks"});
    }
    }

const updatedTask=async(req,res)=>{
        try{
            const task=await Task.findById(req.params.id);
            if(!task){
                return res.status(404).json({message:"Task not found"})
            }
            if(req.body.title !== undefined){
                task.title=req.body.title
            }
            if(req.body.completed !== undefined){
                task.completed=req.body.completed
            }
             
            await task.save();
            res.json(task);
        }catch(error){
            res.status(500).json({message:"Error in updating task"})
        }
    }    

const deleteTask=async(req,res)=>{
    try{
        const tasks=await Task.findByIdAndDelete(req.params.id);
        res.json({message:"Task deleted"})
    }catch(error){
        res.status(500).json({message:"Error in deleting task"})
    }
}
module.exports={createTask,getTasks,updatedTask,deleteTask}