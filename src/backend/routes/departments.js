import express from "express";
import { getDepartments, createDepartment, updateDepartment } from "../controllers/departments.js";

const router = express.Router();

// Tüm departmanları getir
router.get("/", getDepartments);

// Yeni bir departman oluştur
router.post("/", createDepartment);

// Departmanları güncelle
router.patch("/:id", updateDepartment);


export default router;
