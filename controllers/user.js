import { usermodel } from "../models/users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendcookie } from "../utils/cookie.js";
import ErrorHandler from "../utils/errorHandler.js";

// here all the function will be stored 
export const register = async (req,res ,next) =>{
 try{
 const { name , email , password}  = req.body 
    
const user = await  usermodel.findOne({ email })
console.log(user)


if(user) return next(new ErrorHandler("user already exists" , 400))

const hashedpassword = await bcrypt.hash(password , 10)
const newuser = await usermodel.create({
    name,
    email,
    password: hashedpassword
})

sendcookie(newuser, res, "registered successfully " , 201);


    }catch(error){
        next(error)
    }
   
}


export const login = async (req,res ,next) =>{
         
    try{
  const {email , password}  = req.body;
   
    const newuser = await  usermodel.findOne({email}).select("+password") // becuse this tyme we made a condition in schema select condiiton in schem

    if(!newuser) return next(new ErrorHandler("user not exist register first" , 400))                     
 
    const ismatch = await bcrypt.compare(password , newuser.password)

   console.log(ismatch)


   if(!ismatch) return next(new ErrorHandler("invalid password" ,400))
  


    sendcookie(newuser , res, `welcome back , ${newuser.name}` , 200)

    }catch(error){
        next(error)
    }
  

}



export  const  getallusers =  async(req,res ,next) =>{
try{
 const alluser = await usermodel.find({})

    res.status(200).json({
        success: true,
        message: "successfully fetched all user ",
        userlist: alluser
    })

}catch(error){
    next(error)
}
  
}


export const mydetails = async (req,res,next)=>{  
try{
 res.status(200).json({
        success: true,
        user : req.user
    })
}catch(error){
next(error)
}
 

}

export const logout = async (req , res)  =>{
    
    try{
 res.status(200).cookie("token"  , "" , 
    {expires : new Date(Date.now()) , 
    sameSite: process.env.NODE_ENV === "Development"? "lax" :"none", // we have to add here also because we set a environment 
    secure: process.env.NODE_ENV === "Development"? false :"none"}).json({
    success : true,
    message: "logout successfully "
    })
    }catch(error){
        next(error)
    }
   
}