import { usermodel } from "../models/users.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async(req , res , next) =>{
      const {token} = req.cookies;

  console.log(token)

  if(!token){
    return res.status(404).json({
        success: false,
        message: "log in first"
    })
  }

  const decodeddata = jwt.verify(token , process.env.JWT_SECRET)

   console.log(decodeddata)

   req.user = await usermodel.findById(decodeddata._id)

   console.log(req.user)

   next() 
}