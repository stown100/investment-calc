import { Router } from "express";
import { openDb, projectsCollection } from "./db";
import { RateType } from "./entities/project/model/types";
import { getCurrentCryptoPrice } from "./market";

const router = Router();

// Helper function to calculate project profit
async function calculateProjectProfit(project: any): Promise<number> {
  const startDate = new Date(project.startDate);
  const currentDate = new Date();
  const daysSinceInvestment = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // If project hasn't started yet, no profit
  if (daysSinceInvestment < 0) {
    return 0;
  }

  if (project.rateType === RateType.Fixed) {
    // Fixed rate calculation
    const yearsSinceInvestment = daysSinceInvestment / 365.25;
    const annualPercent = project.annualPercent || 0;
    const currentValue =
      project.investedAmount *
      (1 + (annualPercent / 100) * yearsSinceInvestment);
    return currentValue - project.investedAmount;
  } else {
    // Crypto calculation
    if (!project.marketSymbol) {
      return 0;
    }

    try {
      const currentPriceData = await getCurrentCryptoPrice(
        project.marketSymbol
      );
      let tokenAmount: number;

      if (project.tokenAmount && project.tokenAmount > 0) {
        tokenAmount = project.tokenAmount;
      } else if (project.tokenPrice && project.tokenPrice > 0) {
        tokenAmount = project.investedAmount / project.tokenPrice;
      } else {
        return 0;
      }

      const currentValue = tokenAmount * currentPriceData.price;
      return currentValue - project.investedAmount;
    } catch (error) {
      console.error(
        `Error calculating crypto profit for ${project.marketSymbol}:`,
        error
      );
      return 0;
    }
  }
}

// Get all projects with sorting, status filtering, search and pagination
router.get("/", async (req, res) => {
  const {
    sortBy,
    sortOrder,
    status,
    search,
    limit = "10",
    offset = "0",
  } = req.query as Record<string, string>;
  await openDb();
  const col = projectsCollection();

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

  const cursor = col
    .find(filter, { sort, projection: { _id: 0 } })
    .skip(offsetNum)
    .limit(limitNum);
  const projects = await cursor.toArray();
  const normalized = projects.map((p: any) => ({
    ...p,
    rateType: p.rateType || "fixed",
  }));

  res.json(normalized);
});

// Get all projects (lite) for selectors and fast calculations
router.get("/all-lite", async (_req, res) => {
  await openDb();
  const col = projectsCollection();
  const rows = await col
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
});

// Get aggregated summary for all projects
router.get("/summary", async (req, res) => {
  await openDb();
  const col = projectsCollection();
  const today = new Date().toISOString().slice(0, 10);

  const [
    totalProjects,
    totalInvestmentAgg,
    averagePercentAgg,
    activeInvestmentsAgg,
  ] = await Promise.all([
    col.countDocuments({}),
    col
      .aggregate([
        { $group: { _id: null, total: { $sum: "$investedAmount" } } },
      ])
      .toArray(),
    col
      .aggregate([
        { $match: { annualPercent: { $ne: null } } },
        { $group: { _id: null, avg: { $avg: "$annualPercent" } } },
      ])
      .toArray(),
    col
      .aggregate([
        { $match: { startDate: { $lte: today } } },
        { $group: { _id: null, total: { $sum: "$investedAmount" } } },
      ])
      .toArray(),
  ]);

  const totalInvestment = totalInvestmentAgg[0]?.total ?? 0;
  const averagePercent = averagePercentAgg[0]?.avg ?? 0;
  const activeInvestments = activeInvestmentsAgg[0]?.total ?? 0;

  // Calculate total profit for all projects included in summary
  let totalProfit = 0;
  const allProjects = await col
    .find({ includeInSummary: { $ne: false } })
    .toArray();

  for (const project of allProjects) {
    try {
      const profit = await calculateProjectProfit(project);
      totalProfit += profit;
    } catch (error) {
      console.error(
        `Error calculating profit for project ${project.id}:`,
        error
      );
    }
  }

  res.json({
    totalProjects,
    averagePercent,
    totalInvestment,
    activeInvestments,
    totalProfit,
  });
});

// Get all projects with summary for table view
router.get("/all-with-summary", async (req, res) => {
  await openDb();
  const col = projectsCollection();
  const today = new Date().toISOString().slice(0, 10);

  // Get all projects
  const projects = await col
    .find({}, { sort: { createdAt: -1 }, projection: { _id: 0 } })
    .toArray();

  const normalizedProjects = projects.map((p: any) => ({
    ...p,
    rateType: p.rateType || "fixed",
    includeInSummary: p.includeInSummary !== false, // Default to true if not set
  }));

  // Calculate summary only for projects included in summary
  const [
    totalProjects,
    totalInvestmentAgg,
    averagePercentAgg,
    activeInvestmentsAgg,
  ] = await Promise.all([
    col.countDocuments({ includeInSummary: { $ne: false } }),
    col
      .aggregate([
        { $match: { includeInSummary: { $ne: false } } },
        { $group: { _id: null, total: { $sum: "$investedAmount" } } },
      ])
      .toArray(),
    col
      .aggregate([
        {
          $match: {
            annualPercent: { $ne: null },
            includeInSummary: { $ne: false },
          },
        },
        { $group: { _id: null, avg: { $avg: "$annualPercent" } } },
      ])
      .toArray(),
    col
      .aggregate([
        {
          $match: {
            startDate: { $lte: today },
            includeInSummary: { $ne: false },
          },
        },
        { $group: { _id: null, total: { $sum: "$investedAmount" } } },
      ])
      .toArray(),
  ]);

  const totalInvestment = totalInvestmentAgg[0]?.total ?? 0;
  const averagePercent = averagePercentAgg[0]?.avg ?? 0;
  const activeInvestments = activeInvestmentsAgg[0]?.total ?? 0;

  // Calculate total profit for all projects included in summary
  let totalProfit = 0;
  const projectsInSummary = normalizedProjects.filter(
    (p) => p.includeInSummary !== false
  );

  for (const project of projectsInSummary) {
    try {
      const profit = await calculateProjectProfit(project);
      totalProfit += profit;
    } catch (error) {
      console.error(
        `Error calculating profit for project ${project.id}:`,
        error
      );
    }
  }

  res.json({
    projects: normalizedProjects,
    summary: {
      totalProjects,
      averagePercent,
      totalInvestment,
      activeInvestments,
      totalProfit,
    },
  });
});

// Add project
router.post("/", async (req, res) => {
  const {
    id,
    name,
    annualPercent,
    startDate,
    createdAt,
    investedAmount,
    rateType,
    marketSymbol,
    tokenAmount,
    tokenPrice,
  } = req.body;

  if (!id || !name || !startDate || !createdAt || investedAmount == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const normalizedRateType: RateType =
    rateType === RateType.Floating ? RateType.Floating : RateType.Fixed;
  if (
    normalizedRateType === RateType.Fixed &&
    (annualPercent == null || isNaN(Number(annualPercent)))
  ) {
    return res
      .status(400)
      .json({ error: "annualPercent is required for fixed rate projects" });
  }
  await openDb();
  const col = projectsCollection();
  await col.insertOne({
    id,
    name,
    annualPercent:
      normalizedRateType === RateType.Fixed ? Number(annualPercent) : null,
    startDate,
    createdAt,
    investedAmount: Number(investedAmount),
    rateType: normalizedRateType,
    marketSymbol: marketSymbol ?? null,
    tokenAmount: tokenAmount ? Number(tokenAmount) : null,
    tokenPrice: tokenPrice ? Number(tokenPrice) : null,
  });
  res.status(201).json({ message: "Project added" });
});

// Update project
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    annualPercent,
    startDate,
    createdAt,
    investedAmount,
    rateType,
    marketSymbol,
    tokenAmount,
    tokenPrice,
  } = req.body;
  await openDb();
  const col = projectsCollection();
  const normalizedRateType: RateType =
    rateType === RateType.Floating ? RateType.Floating : RateType.Fixed;
  const result = await col.updateOne(
    { id },
    {
      $set: {
        name,
        annualPercent:
          normalizedRateType === RateType.Fixed ? Number(annualPercent) : null,
        startDate,
        createdAt,
        investedAmount: Number(investedAmount),
        rateType: normalizedRateType,
        marketSymbol: marketSymbol ?? null,
        tokenAmount: tokenAmount ? Number(tokenAmount) : null,
        tokenPrice: tokenPrice ? Number(tokenPrice) : null,
      },
    }
  );
  if (!result.matchedCount) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json({ message: "Project updated" });
});

// Delete project
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await openDb();
  const col = projectsCollection();
  const result = await col.deleteOne({ id });
  if (!result.deletedCount) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json({ message: "Project deleted" });
});

// Toggle project inclusion in summary
router.patch("/:id/summary-toggle", async (req, res) => {
  const { id } = req.params;
  const { includeInSummary } = req.body;

  if (typeof includeInSummary !== "boolean") {
    return res
      .status(400)
      .json({ error: "includeInSummary must be a boolean" });
  }

  await openDb();
  const col = projectsCollection();
  const result = await col.updateOne({ id }, { $set: { includeInSummary } });

  if (!result.matchedCount) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json({ message: "Project summary inclusion updated" });
});

export default router;
