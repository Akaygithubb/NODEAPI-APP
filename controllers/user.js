import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { setcookies } from "../utils/features.js";



export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({
      email,
    });
    if (user) {
      return next(new ErrorHandler("User already existed", 400));
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedpassword });

    setcookies(user, res, "Registered Succesfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
try {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  setcookies(user, res, `Welcome Back, ${user.name}`, 201);
} catch (error) {
  next(error);
}
};

export const myprofile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { 
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
      secure:process.env.NODE_ENV==="Development"?false:true },
  )
    .json({
      success: true,
      user: req.user,
    });
};
