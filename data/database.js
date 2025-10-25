import mongoose from "mongoose"

export const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI, {
    dbName:"backendAPI"
}).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err))

}