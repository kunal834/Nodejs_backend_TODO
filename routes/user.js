import express, { Router } from "express";
import { logout ,getallusers , login , register, mydetails} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/all" , getallusers)
// router.post("/new" , newuser)

router.post("/register", register)

router.post("/login", login)


router.get("/logout", logout)

// if it below that dynamic route then error come as it occupy special as id which not exist


router.get("/me" ,isAuthenticated, mydetails)





export default router;
