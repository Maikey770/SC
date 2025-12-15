import { readFileSync } from "node:fs";
import path from "node:path";

export default function handler(req, res) {
  try {
    // Absolute path to schedule data
    const filePath = path.join(
      process.cwd(),
      "api",
      "data",
      "schedule.json"
    );

    // Read and parse JSON
    const raw = readFileSync(filePath, "utf-8");
    const schedule = JSON.parse(raw);

    // Disable caching
    res.setHeader("Cache-Control", "no-store");

    // Return upcoming games
    res.status(200).json({
      title: schedule.title || "Upcoming Games",
      upcoming: Array.isArray(schedule.upcoming)
        ? schedule.upcoming
        : []
    });
  } catch (err) {
    // Handle server error
    console.error("schedule api error:", err);
    res.status(500).json({
      error: "schedule api crashed",
      message: err.message
    });
  }
}
