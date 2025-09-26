import { Router } from "express";
import { openDb, projectsCollection } from "./db";
import { RateType } from "./entities/project/model/types";

const router = Router();

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

  res.json({
    totalProjects,
    averagePercent,
    totalInvestment,
    activeInvestments,
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

export default router;
