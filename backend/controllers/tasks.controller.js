const { default: mongoose } = require('mongoose')
const Task = require('../models/tasks.model')

async function getAllTasks(req,res) {
    console.log("Tasks requested")
    const tasks = await Task.find({user:req.user.id})
    if(!tasks){
        res.status(400).json({error:"Unable to find tasks"})
    }
    res.status(200).json({tasks,message:"Tasks found successfully"})
}

async function getOneTask(req,res){
    const taskId = req.params.taskId

    if(!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: "Invalid task ID format" });
    }

    const task = await Task.findOne({user:req.user.id,_id:taskId})
    if(!task){
        res.status(400).json({error:"Task not found"})
    }
    res.status(200).json({task,message:"Task found successfully"})
}

async function addNewTask(req,res){
    const {title,description} = req.body
    console.log(title,description)
    if(!title){
        res.status(400).json({error:"Please enter valid inputs"})
    }
    const task = await Task.create({
        user:req.user.id,
        title,
        description
    })
    res.status(200).json({task,message:"New task is added"})
}

async function getEditTask(req,res){
    const taskId = req.params.taskId
    const {title,description} = req.body

    if(!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: "Invalid task ID format" });
    }

    const updatedTask = await Task.findOneAndUpdate(
        {user:req.user.id,_id:taskId},
        {title,description},
        {new:true}
    )
    if (!updatedTask) {
        return res.status(404).json({ error: "Task not found to update" });
    }
    res.status(200).json({updatedTask,message:"Your task is updated"})
}

async function getDeleteTask(req,res){
    const taskId = req.params.taskId

    if(!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: "Invalid task ID format" });
    }
    try{
        const task = await Task.findOneAndDelete({_id:taskId,user:req.user.id})
        if(task === null){
            return res.status(200).json({error:"task is not found"})
        }
        res.status(200).json({message:"Task deleted successfully"})
    }catch(err){
        res.status(400).json({error:"Getting error in task deletion"})
    }
}

module.exports = {
    getAllTasks,
    getOneTask,
    addNewTask,
    getEditTask,
    getDeleteTask
}