import { app } from "./app.js";
import { connectdb } from "./data/database.js";

connectdb();

console.log(process.env.PORT)
app.listen(4000 , () =>{
    console.log(`server running on  ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})