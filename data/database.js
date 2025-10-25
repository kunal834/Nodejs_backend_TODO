import mongoose from "mongoose"

export const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI, {
    dbName:"backendAPI"
}).then((c)=>console.log(`mongodb connected with ${c.connection.host}`)).catch((err)=>console.log(err))

}