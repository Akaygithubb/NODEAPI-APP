import express from "express"
import { deletemytask, getmytask, newtask, updatemytask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";



const router=express.Router();

router.post("/new",isAuthenticated,newtask)
router.get("/all",isAuthenticated,getmytask)
router.route("/:id").put(isAuthenticated,updatemytask).delete(isAuthenticated,deletemytask)

export default router;