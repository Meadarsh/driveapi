import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: 'cloud-space', 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

const uploadOnCloudinary = async (fileBuffer, fileName) => {
  try {
    if (!fileBuffer) return null;

    const response = await cloudinary.uploader.upload_stream(
      { 
        folder: './uploads', // Optional: Adjust as needed
        public_id: fileName, 
        resource_type: "auto" 
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
        } else {
          console.log('File uploaded successfully to Cloudinary:', result);
        }
      }
    ).end(fileBuffer);

    return response;
  } catch (error) {
    console.error("Unable to upload to Cloudinary", error);
    return null;
  }
}

export { uploadOnCloudinary };
