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
    const today = new Date().toISOString().slice(0, 10);

    const [
      totalProjects,
      totalInvestmentAgg,
      averagePercentAgg,
      activeInvestmentsAgg,
    ] = await Promise.all([
      projects.countDocuments({}),
      projects
        .aggregate([
          { $group: { _id: null, total: { $sum: "$investedAmount" } } },
        ])
        .toArray(),
      projects
        .aggregate([
          { $match: { annualPercent: { $ne: null } } },
          { $group: { _id: null, avg: { $avg: "$annualPercent" } } },
        ])
        .toArray(),
      projects
        .aggregate([
          { $match: { startDate: { $lte: today } } },
          { $group: { _id: null, total: { $sum: "$investedAmount" } } },
        ])
        .toArray(),
    ]);

    const totalInvestment = totalInvestmentAgg[0]?.total ?? 0;
    const averagePercent = averagePercentAgg[0]?.avg ?? 0;
    const activeInvestments = activeInvestmentsAgg[0]?.total ?? 0;

    res.json({
      totalProjects,
      averagePercent,
      totalInvestment,
      activeInvestments,
    });
  } catch (error) {
    handleError(res, error, 'Failed to get projects summary');
  }
}
