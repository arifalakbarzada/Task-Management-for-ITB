import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
})
const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"Task Manager Support" ${process.env.SENDER_EMAIL}`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email başarıyla gönderildi");
    return { success: true };
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    return { success: false, error };
  }
};
export default sendEmail