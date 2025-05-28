import jwt from "jsonwebtoken";
import Blacklist from "../models/blackList.js";
import { generateToken } from "../utils/generate.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers["x-refresh-token"]; // Refresh token'ı header'dan al

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  const token = authHeader.split(" ")[1];
  const isBlacklisted = await Blacklist.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token geçersiz (blacklist)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token gerekli" });
    }

    const newAccessToken = await generateToken(refreshToken);

    if (newAccessToken) {
      res.setHeader("authorization", `Bearer ${newAccessToken}`);
      req.user = jwt.decode(newAccessToken);
      next();
    } else {
      return res.status(403).json({ message: "Token geçersiz veya süresi dolmuş" });
    }
  }
};
