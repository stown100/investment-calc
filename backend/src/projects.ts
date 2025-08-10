import { Router } from 'express';
import { openDb } from './db';

const router = Router();

// Get all projects with sorting and status filtering
router.get('/', async (req, res) => {
  const { sortBy, sortOrder, status } = req.query;
  const db = await openDb();
  
  let query = 'SELECT * FROM projects';
  let params: any[] = [];
  let conditions: string[] = [];
  
  // Add status filtering
  if (status && (status === 'active' || status === 'pending')) {
    if (status === 'active') {
      conditions.push('startDate <= date("now")');
    } else if (status === 'pending') {
      conditions.push('startDate > date("now")');
    }
  }
  
  // Add WHERE if there are conditions
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  // Add sorting if parameters are specified
  if (sortBy && sortOrder) {
    const validSortFields = ['startDate', 'investedAmount', 'annualPercent', 'createdAt'];
    const validSortOrders = ['asc', 'desc'];
    
    if (validSortFields.includes(sortBy as string) && validSortOrders.includes(sortOrder as string)) {
      query += ` ORDER BY ${sortBy} ${(sortOrder as string).toUpperCase()}`;
    }
  }
  
  const projects = await db.all(query, params);
  res.json(projects);
});

// Add project
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

// Update project
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

// Delete project
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