import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const apiUrl = process.env.BACKEND_URL
export const sendEmailReguest = async (to, subject, html) => {
    try {
        await axios.post(`${apiUrl}/api/email`, { to, subject, html })
    } catch (error) {
        throw error
    }
}