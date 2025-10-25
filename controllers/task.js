import { Tasks } from "../models/Task.js";
import ErrorHandler from "../utils/errorHandler.js";


export const newTask = async(req,res,next) =>{

  try{
 const { title , description  }   = req.body;

    await Tasks.create({
        title,
        description,
        user: req.user,


    })

    res.status(201).json({
        success: true,
        message: "task added successfully"
    })
  }catch(error){
    next(error)
  }
   
}


export  const getmytask = async(req , res,next) =>{
  try{
     const userid = req.user._id;

  console.log(userid)

  const alltasks = await Tasks.find({ user : userid})

  res.status(200).json({
    success: true,
   alltasks,
  })
  }catch(error){
    next(error)
  }
 
}


export  const updatetask = async(req , res,next) =>{
   try{
  const {id}  = req.params ;

  const task = await Tasks.findById(id)

if(!task) return next(new ErrorHandler("task not found" , 400))

  task.iscompleted = !task.iscompleted;

  await task.save()

  res.status(200).json({
    success: true,
    message: "task updated"
  
  })
   }catch(error){
  next(error)
   }


}

export  const deletetask = async(req , res ,next) =>{
  try{
const {id}  = req.params ;

  const task = await Tasks.findById(id)
  
  if(!task) return next(new ErrorHandler("task not found" , 400))

await task.deleteOne()  

  res.status(200).json({
    success: true,
      message: "task deleted successfully"
  })
  }catch(error){
    next(error)
  }
  
}