import { readFileSync } from "node:fs";
import path from "node:path";

export default function handler(req, res) {
  try {
    // Read schedule data from api/data/schedule.json
    const filePath = path.join(process.cwd(), "api", "data", "schedule.json");
    const raw = readFileSync(filePath, "utf-8");
    const schedule = JSON.parse(raw);

    // Disable caching during development
    res.setHeader("Cache-Control", "no-store");

    // Return data in a consistent shape
    res.status(200).json({
      title: schedule.title || "Upcoming Games",
      upcoming: Array.isArray(schedule.upcoming) ? schedule.upcoming : []
    });
  } catch (err) {
    console.error("schedule api error:", err);
    res.status(500).json({
      error: "schedule api crashed",
      message: err.message
    });
  }
}
