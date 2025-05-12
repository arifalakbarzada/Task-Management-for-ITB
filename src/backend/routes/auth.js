// routes/auth.js
import express from 'express';
import User from '../models/users.js';
// import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const header = {
    alg: "HS256",
    typ: "JWT"
  }
  const payload = {
    email: email,
    password: password
  }
  const secret = process.env.ACCESS_SECRET;
  console.log(req.body);
 

  try {
    const user = await User.findOne({ email : email, password: password });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    console.log("Access: Salam"); 
    res.json({user, msg: 'Login successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error 500' });
  }
});
router.post('/register', async (req, res) => {
  const { email, password } = req.body;


  try {
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) return res.status(400).json({ msg: 'User already exists' });
    else
    {
       const user = new User({ email, password });
    await user.save();
    }
   

    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error 500' });
  }
});

export default router;
