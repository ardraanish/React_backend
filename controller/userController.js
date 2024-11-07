const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;
    console.log(username, email, role, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, role, password: hashedPassword });

    await user.save();

    res.status(201).json({
      message: 'User signed up successfully',
      user: { id: user._id, username: user.username, email: user.email, role: user.role }, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY);
    console.log("token",token)
    res.cookie("token", token, { httpOnly: true});
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
exports.logout = async(req,res)=>{
  res.clearCookie('token', {
    httpOnly: true,

  });
  res.status(200).json({ message: 'Logged out successfully' });
}

