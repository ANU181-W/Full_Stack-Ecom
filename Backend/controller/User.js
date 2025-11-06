import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const RegisterUser = async (req, res) => {
  let hashedpassword;
  const { name, email, password, role } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(500).json({ message: "user already registered.." });
    }
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({ message: "password hashing failed" });
    }
    let user;
    try {
      user = new User({
        name,
        email,
        password: hashedpassword,
        role,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "user registration failed" });
    }
    await user.save();
    return res.status(200).json({
      user,
      message: "User Succesfully Registered..",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "user registration failed due to internal error" });
  }
};

export const getuser = async (req, res) => {
  let user;

  user = await User.find();

  if (!user) {
    return res.status(500).json({ message: "user not found..." });
  }

  return res.status(200).json({ user, message: "user  found..." });
};
