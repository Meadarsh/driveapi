import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
const app=express()
import fs from "fs";
import os from "os";
import path from "path";
const directory = 'tmp';

const tempDir = path.join(os.tmpdir(), 'temp'); // Adjust the folder name as needed

try {
  // Check if the directory exists
  if (!fs.existsSync(tempDir)) {
    // If not, create the directory
    fs.mkdirSync(tempDir);
    console.log(`Directory '${tempDir}' created successfully.`);
  } else {
    console.log(`Directory '${tempDir}' already exists.`);
  }

  // Your application logic goes here...

} catch (error) {
  // Handle any errors that occur during directory creation
  console.error('Error:', error);
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
