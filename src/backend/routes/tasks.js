import express from 'express';
import Task from '../models/tasks.js';
import User from '../models/users.js';
import mongoose from 'mongoose';
import { addTaskSchema, updateTaskSchema, updateTaskUserSchema } from '../schemas/task.js';
import { sendEmailReguest } from '../../services/sendEmail.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { departmentId, owner, status} = req.query;
    const filter = {
      isDeleted: false,
    };
    if (status) {
      filter.status = status;
    }

    if (owner) {
      filter.userId = owner
    }

    if (departmentId && mongoose.Types.ObjectId.isValid(departmentId)) {
      filter.departmentId = new mongoose.Types.ObjectId(departmentId);
    }

    const tasks = await Task.find(filter)

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Görev bulunamadı' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});



router.post('/', async (req, res) => {

  if (req.body.title === undefined || req.body.description === undefined || req.body.owner === undefined || req.body.deadline === undefined) {
    return res.status(400).json({ message: 'Başlık, açıklama, sahibi ve tarih gereklidir' });
  }

  try {
    const task = req.body;
    const user = await User.findOne({_id :task.userId});
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
    // Send email to the user
    sendEmailReguest(user.email, 'Yeni Görev Oluşturuldu', addTaskSchema(task))
  } catch (error) {
    res.status(500).json({ message: 'Görev eklenemedi', error });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const currentTask = await Task.findById(id);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Güncelleme için en az bir alan gereklidir' });
  }
  

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Görev bulunamadı' });
    }
    if (currentTask.owner !== req.body.owner) {
    const user = await User.findOne({_id: req.body.userId }); 
    const currentUser = await User.findOne({_id: currentTask.userId });
    sendEmailReguest(user.email, 'Görev sahibi güncellendi', updateTaskUserSchema(currentTask,req.body))
    sendEmailReguest(currentUser.email, 'Görev sahibi güncellendi', updateTaskSchema(currentTask,req.body))
    
  }
  else if (currentTask.isDeleted !== req.body.isDeleted) {
    const user = await User.findOne({_id: currentTask.userId });
    sendEmailReguest(user.email, 'Görev Güncellendi', updateTaskSchema(currentTask, req.body))
  }
  else{
    const user  = await User.findOne({_id: currentTask.userId });
    sendEmailReguest(user.email, 'Görev Güncellendi', updateTaskSchema(currentTask, req.body))
  }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Güncelleme hatası', error });
  }
});

export default router;
