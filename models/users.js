import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    email: {
        type : String,
        required : true,
     unique: true
    } ,
    password: {
        type : String,
        required : true,
       select : false
    },
    createdAT:{
        type : Date,
              
        default : Date.now
    }
})

export const usermodel = mongoose.model("users" , schema)