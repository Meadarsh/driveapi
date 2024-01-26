import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { loginUser } from "../controller/user.controller.js";
import { uploadFile } from "../controller/upload.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { Data } from "../controller/data.controller.js";
import { deleteFromCloudinary } from "../controller/delete.controller.js";
const router =Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//  Secure routes  
router.route("/upload").post(auth,uploadFile)
router.route("/delete/:data").delete(auth,deleteFromCloudinary)
router.route("/").post(auth,Data)

export default router
