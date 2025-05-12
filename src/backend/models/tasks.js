import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: String,
  status: String,
  deadline: String,
  userId: String,
  departMentId: String,
  creatationDay: String,
  isDeleted: Boolean
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
