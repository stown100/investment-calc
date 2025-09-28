import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, projectsCollection } from '../_lib/db';
import { cors, authMiddleware, AuthRequest, handleError } from '../_lib/middleware';

export default async function handler(req: AuthRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!authMiddleware(req, res)) return;

  try {
    await connectToDatabase();
    const projects = projectsCollection();

    const rows = await projects
      .find(
        {},
        {
          sort: { createdAt: -1 },
          projection: {
            _id: 0,
            id: 1,
            name: 1,
            annualPercent: 1,
            startDate: 1,
            investedAmount: 1,
            rateType: 1,
            marketSymbol: 1,
          },
        }
      )
      .toArray();
      
    const normalized = rows.map((p: any) => ({
      ...p,
      rateType: p.rateType || "fixed",
    }));
    
    res.json(normalized);
  } catch (error) {
    handleError(res, error, 'Failed to get projects');
  }
}
