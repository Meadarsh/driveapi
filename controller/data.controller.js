import { asyncHandler } from "../utility/asyncHandler.js";
import { File } from "../models/file.model.js";
import { User } from "../models/users.model.js";
const Data = asyncHandler(async (req, res) => {
  try {
    let user = req.user.email;
    if (!user)return res.status(401).send({ message: "Unauthorized", auth: false });
    const data = await File.find({uploaded_by: user});
    const storage =await User.find({email:user})
    return res.status(201).send({files:data,storage:storage[0].stored , auth: true});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
});

export { Data };
