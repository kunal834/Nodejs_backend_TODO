import express from "express"
import userrouter from "./routes/user.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/task.js";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors"

export const  app =  express();

if(process.env.NODE_ENV != "Production"){
config({
    path:"./.env",
})
}

// all middlewares 
// in middlewares order of declaring is also imp 

app.use(express.json()) // use to read json data
app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors({
    origin : [process.env.FRONTEND_URI],
    methods: ["GET" , "POST" ,"PUT" , "DELETE"] ,
    credentials: true,  // to send the error in frontend like session 
    
}))


app.use( "/api/v1/users", userrouter) // means in that route user will be prefix to hit that endpoint
app.use("/api/v1/tasks" , taskrouter)


app.get("/" , (req, res) =>{
    res.send("Nice work")
})

// Error handling 

app.use(errormiddleware)



