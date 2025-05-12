import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  id: String,
  name: String
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
