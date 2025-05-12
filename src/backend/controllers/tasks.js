import Task from "../models/tasks.js";

// Tüm görevleri getir
export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Yeni görev oluştur
export const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
};

// Bir görevi güncelle
export const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

// Bir görevi sil
export const deleteTask = async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted", deletedTask });
};
