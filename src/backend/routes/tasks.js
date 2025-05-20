import express from 'express';
import Task from '../models/tasks.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { departmentId, owner, status } = req.query;

    const filter = {
      isDeleted: false,
    };

    // Only add valid filters
    if (status) {
      filter.status = status;
    }

    if (owner) {
      filter.owner = owner
    }

    if (departmentId && mongoose.Types.ObjectId.isValid(departmentId)) {
      filter.departmentId = new mongoose.Types.ObjectId(departmentId);
    }

    const tasks = await Task.find(filter);

    if (tasks.length === 0) {
      console.log('Filtre:', filter);
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
    console.log(task)
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
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
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Güncelleme hatası', error });
  }
});

export default router;
