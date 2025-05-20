import mongoose from "mongoose";
import User from "../models/users.js";

export const getUsers = async (req, res) => {
  const users = await User.find({
    $or: [
      { isDeleted: false },
      { role: 'admin' }
    ]
  })
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
};

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json(deleted);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email, password });
  if (user.length > 0) {
    res.json(user[0]);
  }
  else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}