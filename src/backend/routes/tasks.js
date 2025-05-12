import express from 'express';
import Task from '../models/tasks.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { userId, departmentId } = req.query;
    const filter = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      filter.userId = new mongoose.Types.ObjectId(userId);
    }

    if (departmentId && mongoose.Types.ObjectId.isValid(departmentId)) {
      filter.departmentId = new mongoose.Types.ObjectId(departmentId);
    }

    const tasks = await Task.find(filter);

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Görev bulunamadı' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// POST: Yeni görev ekle
router.post('/', async (req, res) => {
  const { title, description, owner, deadline, status } = req.body;

  // Verilerin doğruluğunu kontrol et
  if (!title || !description || !owner || !deadline) {
    return res.status(400).json({ message: 'Başlık, açıklama, sahibi ve tarih gereklidir' });
  }

  try {
    const newTask = new Task({ title, description, owner, deadline, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Görev eklenemedi', error });
  }
});

// PATCH: Görev güncelle (örneğin sadece "completed" alanı)
router.patch('/:id', async (req, res) => {
  const { title, description, owner, deadline, status, isDeleted } = req.body;

  // Görev güncelleme için verileri doğrula
  if (!title && !description && !owner && !deadline && !status) {
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
