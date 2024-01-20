import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
const app=express()
import fs from "fs";
import os from "os";
import path from "path";
const directory = 'tmp';

try {
  fs.mkdirSync('/temp');
} catch (error) {
  if (error.code !== 'EEXIST') {
    // Handle the error, other than "directory already exists"
    console.error('Error creating directory:', error);
  }
}

    app.use(fileUpload(
    {useTempFiles:true,
     tempFileDir :'/temp'
    }
))

app.use(cors({
  origin:'https://cloud-storage-zeta.vercel.app',
  credentials: true,
}));


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
