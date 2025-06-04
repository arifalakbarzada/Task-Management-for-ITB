import { sendEmailReguest } from "../../services/sendEmail.js";
import { deleteDepartmentEmailTemplate } from "../emails/department.js";
import Department from "../models/departments.js";
import Task from "../models/tasks.js";
import User from "../models/users.js"

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
export const deleteDepartment = async (req, res) => {
  try {
    const { _id } = req.params;

    // Departmanı soft delete et
    const deletedDepartment = await Department.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Departman bulunamadı' });
    }
const users = await User.find({departmentId : _id})
    // Görevleri soft delete et
    await Task.updateMany(
      { departmentId: _id },
      { isDeleted: true }
    );

    // Kullanıcıları soft delete et
    await User.updateMany(
      { departmentId: _id },
      { isDeleted: true }
    );
    for (const user of users) {
  try {
    await sendEmailReguest(
      user.email,
      'Departman Silindi',
      deleteDepartmentEmailTemplate(user.name, deletedDepartment.name)
    );
  } catch (err) {
    console.error(`Email gönderilemedi: ${user.email}`, err);
  }
}

    res.status(200).json({
      message: 'Departman, görevler ve kullanıcılar silindi',
      department: deletedDepartment,
    });
  } catch (error) {
    console.error('Departman silme hatası:', error);
    res.status(500).json({ message: 'Departman silinirken hata oluştu', error });
  }
};
