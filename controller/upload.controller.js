import { asyncHandler } from "../utility/asyncHandler.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import { File } from "../models/file.model.js";
import { IncomingForm } from 'formidable';

const uploadFile = asyncHandler(async(req, res) => {
  try {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const file = files.files;
      console.log(file);

      if (!file) {
        return res.status(400).json({ message: 'Select a file' });
      }

      const path = file.path;

      /**********   Storage calculate      ******************************************************/
      const user = await User.findOne({ email: req.user.email });
      const fileSize = file.size;
      const occupied = user.stored;
      const total = occupied + fileSize;

      if (total > process.env.MAX_STORAGE_LIMIT) {
        return res.status(400).json({ message: 'Exceeding storage limit' });
      }

      /****************Get extension **************/
      const fileName = file.name;
      const parts = fileName.split('.');
      const fileExtension = parts.pop();
      const onlyName = fileName.split('.' + fileExtension);

      let imageUrl = await uploadOnCloudinary(path);
      const { url, bytes, resource_type, public_id, duration } = imageUrl;

      user.stored = total;
      await user.save();

      // save the URL to the database
      await File.create({
        uploaded_by: req.user.email,
        name: onlyName[0],
        path: url,
        type: resource_type,
        size: bytes,
        duration: duration,
        public_id: public_id,
        format: fileExtension
      });

      return res.status(201).json({ message: 'Uploaded successfully', path });
    });
  } catch (error) {
    console.log('Error in getting the file:', error);
    return res.status(500).json({
      err: error,
      message: 'Internal server error',
    });
  }
});

export {uploadFile}
