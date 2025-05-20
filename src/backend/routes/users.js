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

export default router;
