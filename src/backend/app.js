import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import departmentRoutes from "./routes/departments.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/email.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API for managing users, departments, tasks, and authentication.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // API endpoint'lerini tanımladığınız dosyaların yolu
};

const specs = swaggerJsdoc(options);



dotenv.config({ path: './.env' });

const startServer = async () => {
  try {
    await connectDB(); // ⭐ Burada await çok önemli
    app.listen(5000, () => {
      console.log("✅ Server çalışıyor: http://localhost:5000");
    });
  } catch (error) {
    console.error("❌ MongoDB bağlantı hatası:", error.message);
  }
};

startServer();

const app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",

}));
app.get('/cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api',  authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/departments",  departmentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/email", emailRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(5000, () => {
  console.log('Backend çalışıyor: http://localhost:5000');
});
export default app;