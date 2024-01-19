import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
const auth = (req, res, next) => {
  try {
    let token = req.cookies.accessToken;
    if (!token) {return res.status(401).send({ message: "Unauthorized!", auth: false });}
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // console.log("verified", verified);
    const user = User.findById(verified._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", auth: false });
    }
    req.user = verified;
    next();
  } catch (error) {
    console.log("Error in Auth Middleware : ", error);
  }
};

export { auth };
