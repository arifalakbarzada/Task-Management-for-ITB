import bcrypt from "bcrypt";
import User from "../models/users.js";
import { editUserSchema } from "../schemas/editUser.js";
import sendEmail from "../../services/email.js";

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
  const existingUser = await User.find({ email: req.body.email });
  if (existingUser.length > 0) {
    return res.status(400).json({ msg: "Bu e-posta zaten kullanımda" });
  }
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  try {
    const oldUser = await User.findById(req.params._id);
    if (!oldUser) return res.status(404).json({ msg: "Kullanıcı bulunamadı" });

    let rawPassword = null;

    if (req.body.email && req.body.email !== oldUser.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ msg: "Bu e-posta zaten kullanımda" });
      }
    }

    if (req.body.password) {
      rawPassword = req.body.password;
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updated = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });

    sendEmail(
      updated.email,
      "Hesap Güncellendi",
      editUserSchema(oldUser, { ...updated.toObject(), password: rawPassword || "******" })
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Bir hata oluştu" });
  }
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