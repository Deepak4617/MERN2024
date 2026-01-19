const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send('Hey guys lets start for mern stack language')

    } catch (error) {

    }
}

const about = async (req, res) => {
    try {
        res.status(200).send('Start mern stack project')
    }
    catch (error) {
        res.status(400).send('This is page is not found!')

    }
}

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    res.status(200).json({
      msg: "Login successful",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });

  } catch (error) {
    next(error);
  }
};

const user = async (req,res) => {
 try {
    const userData = req.user;
    console.log(userData)
    return res.status(200).json({msg: userData});
 } catch (error) {
    console.log(`error from the user route ${error}`)
    
 }
}


module.exports = { home, about, register,login,user };
