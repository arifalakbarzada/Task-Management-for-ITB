import Department from "../models/departments.js";

// Departmanları getir
export const getDepartments = async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
};

// Yeni bir departman oluştur
export const createDepartment = async (req, res) => {
  const newDepartment = new Department(req.body);
  const savedDepartment = await newDepartment.save();
  res.status(201).json(savedDepartment);
};

// Departmanı güncelle
export const updateDepartment = async (req, res) => {
  const updatedDepartment = await Department.findByIdAndUpdate(req.params
.id, req.body
, { new: true });
  res.json(updatedDepartment);
}