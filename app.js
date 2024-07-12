import express from "express";
import userrouter from"./routes/user.js";
import taskrouter from"./routes/task.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env"
})
// const router=express.Router();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}));



app.use("/api/v1/users",userrouter)
app.use("/api/v1/task",taskrouter)

// adding prefix



app.get("/", (req, res) => {
    res.send("Nice working");
});






// note here now express app will consider as id too as it runs line by line 
//* so by this if we put this before :/id then it will be consider as 
//* diff route



// using error middlewares
app.use(errormiddleware)