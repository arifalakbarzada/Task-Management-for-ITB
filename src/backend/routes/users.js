import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:_id", getUserById);
router.post("/", createUser);
router.patch("/:_id", updateUser);
router.delete("/:id", deleteUser);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */



export default router;
