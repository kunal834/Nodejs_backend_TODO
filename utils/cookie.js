import jwt from "jsonwebtoken"

export const sendcookie = ( newuser,res, message , statuscode) =>{
    const token = jwt.sign({_id: newuser._id} , process.env.JWT_SECRET)

return res.status(statuscode).cookie("token" , token , {
    httpOnly:true ,   
    expires: new Date(Date.now() + 15 * 60 * 1000) ,
    sameSite: process.env.NODE_ENV === "Development"? "lax" :"none",
    secure: process.env.NODE_ENV === "Development"? false : true
}).json({
    success : true,
    message : message ,
})
}
