import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: String,
    description: {
        type : String,
        require: true,
     
    } ,
    iscompleted:{
        type : Boolean,
        default : false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        require: true
    },
    createdAT:{
        type : Date,
        default : Date.now
    }
})

export const Tasks = mongoose.model("Task" , schema)