import { Router } from 'express';
import { openDb } from './db';

const router = Router();

// Получить все проекты
router.get('/', async (req, res) => {
  const db = await openDb();
  const projects = await db.all('SELECT * FROM projects');
  res.json(projects);
});

// Добавить проект
router.post('/', async (req, res) => {
  const { id, name, annualPercent, startDate, createdAt, investedAmount } = req.body;
  if (!id || !name || annualPercent == null || !startDate || !createdAt || investedAmount == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = await openDb();
  await db.run(
    'INSERT INTO projects (id, name, annualPercent, startDate, createdAt, investedAmount) VALUES (?, ?, ?, ?, ?, ?)',
    [id, name, annualPercent, startDate, createdAt, investedAmount]
  );
  res.status(201).json({ message: 'Project added' });
});

// Обновить проект
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, annualPercent, startDate, createdAt, investedAmount } = req.body;
  const db = await openDb();
  const result = await db.run(
    'UPDATE projects SET name = ?, annualPercent = ?, startDate = ?, createdAt = ?, investedAmount = ? WHERE id = ?',
    [name, annualPercent, startDate, createdAt, investedAmount, id]
  );
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json({ message: 'Project updated' });
});

// Удалить проект
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await openDb();
  const result = await db.run('DELETE FROM projects WHERE id = ?', [id]);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json({ message: 'Project deleted' });
});

export default router; 