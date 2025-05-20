import Task from "../models/tasks.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
};

export const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted", deletedTask });
};
