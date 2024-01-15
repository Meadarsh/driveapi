import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
const app=express()
app.use(fileUpload(
    {useTempFiles:true}
))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://cloud-storage-zeta.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Respond to preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
