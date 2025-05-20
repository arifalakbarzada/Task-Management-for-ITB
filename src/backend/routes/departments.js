import express from "express";
import { getDepartments, createDepartment, updateDepartment } from "../controllers/departments.js";

const router = express.Router();

router.get("/", getDepartments);

router.post("/", createDepartment);

router.patch("/:_id", updateDepartment);


export default router;
