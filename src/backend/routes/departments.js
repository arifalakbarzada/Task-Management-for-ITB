import express from "express";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../controllers/departments.js";

const router = express.Router();

router.get("/", getDepartments);

router.post("/", createDepartment);

router.patch("/:_id", updateDepartment);

router.delete('/:_id' , deleteDepartment)


export default router;
