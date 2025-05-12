import jwt from 'jsonwebtoken';
import User from '../models/users.js';
let refreshTokens = [];

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });


    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Refresh token is invalid' });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token expired or invalid' });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
