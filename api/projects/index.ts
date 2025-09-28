import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, projectsCollection } from '../_lib/db';
import { cors, authMiddleware, AuthRequest, handleError } from '../_lib/middleware';

export default async function handler(req: AuthRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  
  if (!authMiddleware(req, res)) return;

  try {
    await connectToDatabase();
    const projects = projectsCollection();

    if (req.method === 'GET') {
      const {
        sortBy,
        sortOrder,
        status,
        search,
        limit = "10",
        offset = "0",
      } = req.query as Record<string, string>;

      const filter: any = {};
      if (search && search.trim() !== "") {
        filter.name = { $regex: new RegExp(search.trim(), "i") };
      }
      if (status === "active") {
        filter.startDate = { $lte: new Date().toISOString().slice(0, 10) };
      } else if (status === "pending") {
        filter.startDate = { $gt: new Date().toISOString().slice(0, 10) };
      }

      const limitNum = Math.max(1, Math.min(100, parseInt(String(limit)) || 10));
      const offsetNum = Math.max(0, parseInt(String(offset)) || 0);

      const sort: any = {};
      const validSortFields = [
        "startDate",
        "investedAmount",
        "annualPercent",
        "createdAt",
      ];
      if (sortBy && validSortFields.includes(sortBy)) {
        sort[sortBy] = String(sortOrder || "desc").toLowerCase() === "asc" ? 1 : -1;
      }

      const cursor = projects
        .find(filter, { sort, projection: { _id: 0 } })
        .skip(offsetNum)
        .limit(limitNum);
      const projectList = await cursor.toArray();
      const normalized = projectList.map((p: any) => ({
        ...p,
        rateType: p.rateType || "fixed",
      }));
      
      res.json(normalized);
    } else if (req.method === 'POST') {
      const {
        id,
        name,
        annualPercent,
        startDate,
        createdAt,
        investedAmount,
        rateType,
        marketSymbol,
      } = req.body;

      if (!id || !name || !startDate || !createdAt || investedAmount == null) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const normalizedRateType = rateType === "floating" ? "floating" : "fixed";
      if (
        normalizedRateType === "fixed" &&
        (annualPercent == null || isNaN(Number(annualPercent)))
      ) {
        return res
          .status(400)
          .json({ error: "annualPercent is required for fixed rate projects" });
      }

      await projects.insertOne({
        id,
        name,
        annualPercent:
          normalizedRateType === "fixed" ? Number(annualPercent) : null,
        startDate,
        createdAt,
        investedAmount: Number(investedAmount),
        rateType: normalizedRateType,
        marketSymbol: marketSymbol ?? null,
      });

      res.status(201).json({ message: "Project added" });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    handleError(res, error, 'Failed to process projects request');
  }
}
