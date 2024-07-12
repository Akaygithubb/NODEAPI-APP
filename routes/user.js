import express from "express";
import {  login, logout, myprofile, register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();


router.post("/new", register);
router.post("/login",login);
router.get("/logout",logout);

router.get("/me",isAuthenticated,myprofile);

//todo above and below line and equivalent




// router.get("/userid/:id",userid);
// router.put("/userid/:id",updateuserid);
// router.delete("/userid/:id",deleteuserid);

export default router;
