
const express=require("express");
const router=express.Router();
const protect=require("../middleware/protect")
const {createTask,
        getTasks,
        updatedTask,
        deleteTask
    }=require("../controllers/taskController");

router.post("/",protect,createTask);
router.get("/",protect,getTasks);
router.put("/:id",protect,updatedTask);
router.delete("/:id",protect,deleteTask)

module.exports=router;