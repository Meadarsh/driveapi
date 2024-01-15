import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
const app=express()
app.use(fileUpload(
    {useTempFiles:true}
))
app.use(cors({
    origin:"https://driveapi-seven.vercel.app/",

}))


app.use(express.json({
    limit:"100mb",
}))
app.use(express.urlencoded({
    extended:true,
    limit:"100mb"
}))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users",userRouter)

export {app}
