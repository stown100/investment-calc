import { Router } from 'express';
import { openDb } from './db';

const router = Router();

// Get all projects with sorting, status filtering, search and pagination
router.get('/', async (req, res) => {
  const { sortBy, sortOrder, status, search, limit = '10', offset = '0' } = req.query;
  const db = await openDb();
  
  let query = 'SELECT * FROM projects';
  let params: any[] = [];
  let conditions: string[] = [];
  
  // Add search filtering
  if (search && typeof search === 'string' && search.trim() !== '') {
    const searchTerm = search.trim();
    
    // Simple LIKE search - more precise
    conditions.push('LOWER(name) LIKE LOWER(?)');
    params.push(`%${searchTerm}%`);
  }
  
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
  
  // Add pagination
  const limitNum = parseInt(limit as string) || 10;
  const offsetNum = parseInt(offset as string) || 0;
  
  // Validate pagination parameters
  if (limitNum < 1 || limitNum > 100) {
    return res.status(400).json({ error: 'Limit must be between 1 and 100' });
  }
  if (offsetNum < 0) {
    return res.status(400).json({ error: 'Offset must be non-negative' });
  }
  
  // Build pagination query
  if (offsetNum === 0) {
    query += ` LIMIT ${limitNum}`;
  } else {
    query += ` LIMIT ${limitNum} OFFSET ${offsetNum}`;
  }
  
  const projects = await db.all(query, params);
  
  res.json(projects);
});

// Get all projects (lite) for selectors and fast calculations
router.get('/all-lite', async (_req, res) => {
  const db = await openDb();
  // Return only required columns to keep payload small
  const rows = await db.all(
    'SELECT id, name, annualPercent, startDate, investedAmount FROM projects ORDER BY createdAt DESC'
  );
  res.json(rows);
});

// Get aggregated summary for all projects
router.get('/summary', async (req, res) => {
  const db = await openDb();

  // Total count
  const totalRow = await db.get('SELECT COUNT(*) as count FROM projects');
  const totalProjects = totalRow?.count ?? 0;

  // Total investment
  const totalInvestmentRow = await db.get('SELECT COALESCE(SUM(investedAmount), 0) as total FROM projects');
  const totalInvestment = totalInvestmentRow?.total ?? 0;

  // Average percent
  const avgPercentRow = await db.get('SELECT COALESCE(AVG(annualPercent), 0) as avg FROM projects');
  const averagePercent = avgPercentRow?.avg ?? 0;

  // Active investments (sum where startDate <= today)
  const activeInvestmentRow = await db.get('SELECT COALESCE(SUM(investedAmount), 0) as total FROM projects WHERE startDate <= date("now")');
  const activeInvestments = activeInvestmentRow?.total ?? 0;

  res.json({
    totalProjects,
    averagePercent,
    totalInvestment,
    activeInvestments,
  });
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