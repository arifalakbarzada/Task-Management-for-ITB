import Department from "../models/departments.js";

export const getDepartments = async (req, res) => {
  const departments = await Department.find({ isDeleted: false });
  res.json(departments);
};

export const createDepartment = async (req, res) => {
  const newDepartment = new Department(req.body);
  const savedDepartment = await newDepartment.save();
  res.status(201).json(savedDepartment);
};

export const updateDepartment = async (req, res) => {
  const updatedDepartment = await Department.findByIdAndUpdate(req.params
._id, req.body
, { new: true });
  res.json(updatedDepartment);
}