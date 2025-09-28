import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, projectsCollection } from '../_lib/db';
import { cors, authMiddleware, AuthRequest, handleError } from '../_lib/middleware';

export default async function handler(req: AuthRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  
  if (!authMiddleware(req, res)) return;

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  try {
    await connectToDatabase();
    const projects = projectsCollection();

    if (req.method === 'PUT') {
      const {
        name,
        annualPercent,
        startDate,
        createdAt,
        investedAmount,
        rateType,
        marketSymbol,
      } = req.body;

      const normalizedRateType = rateType === "floating" ? "floating" : "fixed";
      
      const result = await projects.updateOne(
        { id },
        {
          $set: {
            name,
            annualPercent:
              normalizedRateType === "fixed" ? Number(annualPercent) : null,
            startDate,
            createdAt,
            investedAmount: Number(investedAmount),
            rateType: normalizedRateType,
            marketSymbol: marketSymbol ?? null,
          },
        }
      );

      if (!result.matchedCount) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ message: "Project updated" });
    } else if (req.method === 'DELETE') {
      const result = await projects.deleteOne({ id });
      
      if (!result.deletedCount) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ message: "Project deleted" });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    handleError(res, error, 'Failed to process project request');
  }
}
