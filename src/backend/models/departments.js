import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  isDeleted: Boolean
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
