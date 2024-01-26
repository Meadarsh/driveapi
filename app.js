import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
const app=express()

try {
  // Create the directory and its parent directories if they don't exist
  fs.mkdirSync(tempDir, { recursive: true });
  console.log(`Directory '${tempDir}' created successfully.`);

  // Configure express-fileupload to use the correct temporary directory
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: tempDir,
    })
  );} catch (error) {
  // Handle any errors that occur during directory creation
  console.error('Error:', error);
}

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
