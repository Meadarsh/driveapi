import { v2 as cloudinary } from "cloudinary";


cloudinary.config({ 
    cloud_name: 'cloud-space', 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
  });

  const uploadOnCloudinary =async (localFilePath)=>{
  try {
    if(!localFilePath) return null
   const response= await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })
    console.log('file is uploaded')
    return response
  } catch (error) {
    console.log("unable to upload",error)
  }


  }

 export {uploadOnCloudinary}
