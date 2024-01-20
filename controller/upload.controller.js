import { asyncHandler } from "../utility/asyncHandler.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import { File } from "../models/file.model.js";
const uploadFile = asyncHandler(async(req, res) => {
  try {
    if(!req.files) {return res.status(400).json({message:"Select a file"})}
    const path=req.files?.files.tempFilePath
  /**********   Storage calculate      ****************************************************** */
 const user = await User.findOne({email:req.user.email})
  const fileSize = req.files.files.size
  const ocupied = user.stored
  const total =ocupied+fileSize
  if(total>process.env.MAX_STORAGE_LIMIT) return res.status(400).json({message:"Exceeding storage limit"})
 /****************Get extention **************/
   const fileName = req.files.files.name;
const parts = fileName.split('.');
const fileExtension = parts.pop();
const onlyName = fileName.split('.'+fileExtension)
    let imageUrl =await uploadOnCloudinary(path);
    const {url,bytes,resource_type,public_id,duration}=imageUrl

     user.stored = total
     await user.save()

    //save the url to database
    await File.create({
      uploaded_by:req.user.email,
      name: onlyName[0],  //文件名称
      path: url,   //存储路径
      type: resource_type,   //类型，如：图片、视频
      size: bytes,   //大小，单位kb
      duration:duration,
      public_id:public_id  ,
      format:fileExtension
    })*/
    return res.status(201).json({message:"Uploaded successfully",path}) 
  } catch (error) {
    console.log("Error in getting the file :", error);
    return res.status(500).json({
      err: error,
      message: "internal server eror",
    });
  }
});

export {uploadFile}
