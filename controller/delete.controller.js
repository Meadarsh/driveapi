import { asyncHandler } from "../utility/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { File } from "../models/file.model.js";
import { User } from "../models/users.model.js";

cloudinary.config({
  cloud_name: "cloud-space",
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const deleteFromCloudinary = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const dataId = req.params.data;
    const file = await File.findById(dataId);
    const publicid=file.public_id
    const deleted = await cloudinary.uploader.destroy(publicid);
    if (!deleted) {
      return res.status(500).json({
        err: error,
        message: "internal server error",
      });
    }
     const user =await User.findById(userId)
     let currentOcupied=user.stored;
     user.stored=currentOcupied-file.size
     await user.save()
    await File.findByIdAndDelete(dataId);
    res.status(205).json({ message: "Deleted Sucessfully" });
  } catch (error) {
    return res.status(500).json({
      err: error,
      message: "internal server eror",
    });
  }
});

export { deleteFromCloudinary };
