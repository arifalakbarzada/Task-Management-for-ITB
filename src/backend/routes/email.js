import express from "express";
import sendEmail from "../../services/email.js";
const router = express.Router();


router.post("/", async (req, res) => {
  const { to, subject, html } = req.body;

  const result = await sendEmail(to, subject, html);

  if (result.success) {
    res.status(200).json({ message: "Email gönderildi" });
  } else {
    res.status(500).json({ error: result.error });
  }
});
export default router;