import { asyncHandler } from "../utility/asyncHandler.js";
import { User } from "../models/users.model.js";
const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
/********************************Generate token */
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generaterRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!userName)
    return res.status(400).json({ message: "Name field is required." });
  if (!email)
    return res.status(400).json({ message: "Email field is required." });
  const domain = email.split("@")[1];
  if (!allowedDomains.includes(domain)) {
    return res.status(400).json({ message: "Invalid domain of email." });
  }
  if (!password)
    return res.status(400).json({ message: "Enter your password." });

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(400).json({ message: "You are already registered." });
  }

  const user = await User.create({
    email: email,
    userName: userName,
    password: password,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  res.status(201).json({
    success: true,
    data: userCreated,
     .redirect(302, 'https://cloud-storage-zeta.vercel.app/login');
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //checking empty fields
  if (!email || !password) {
   return res.status(400).json({
      message: "Please enter all the details.",
    });
  }
  const Valid = await User.findOne({ email: email });
  if (!Valid) {
    return res.status(401).json({
      message: "Email is not registered.",
    });
  }
  const verified = await Valid.isPasswordCorrect(password);
  if (!verified) {
    return res.status(401).json({
      message: "Invalid Password!",
    });
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    Valid._id
  );

  const loggedInUser = await User.findById(Valid._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json({
      userInfo: loggedInUser,
      accessToken,
      refreshToken,
      message: "User logged in successfully "
    })
});

export { registerUser, loginUser };
