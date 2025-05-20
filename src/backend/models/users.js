import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  surName: String,
  fatherName: String,
  departmentName: String,
  password: String,
  email: String,
  position: String,
  role: String,
  isDeleted: Boolean,
  departmentId: String
});
const User = mongoose.model("User", userSchema);
export default User;