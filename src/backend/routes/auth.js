import express from 'express';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { verifyToken } from '../middlewares/auth.js';
import BlacklistedToken from '../models/blackList.js'
import { htmlTemplate } from '../emails/register.js';
import { sendEmailReguest } from '../../services/sendEmail.js';
dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  const secret = process.env.JWT_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;


  try {

    const accessToken = jwt.sign({ userId: user._id.toString(), email }, secret, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ userId: user._id.toString(), email }, refreshSecret, { expiresIn: "7d" });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    res.json({ user, msg: 'Login successful', accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ msg: 'Server error 500' });
  }
});
router.post('/register', async (req, res) => {
  const { email, password, user } = req.body;


  try {
    const existingUser = await User.find({ email: email });
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
    }


    res.status(201).json({ msg: 'User created' });
    sendEmailReguest(email, "Hesap Oluşturuldu", htmlTemplate(user.name, password))
  } catch (err) {
    res.status(500).json({ msg: 'Server error 500' });
  }
});
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token gerekli." });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Geçersiz refresh token." });
    }

    const newAccessToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  });
});
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(400);

  try {
    const decoded = jwt.decode(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000);

    await BlacklistedToken.create({ token: refreshToken, expiresAt });

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Geçersiz token" });
  }
});

export default router;
