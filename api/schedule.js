import { readFileSync } from "node:fs";

export default function handler(req, res) {
  try {
    // Read JSON file from repo at runtime
    const raw = readFileSync("src/data/schedule.json", "utf-8");
    const schedule = JSON.parse(raw);

    const upcoming = Array.isArray(schedule?.upcoming)
      ? schedule.upcoming
      : Array.isArray(schedule?.games)
        ? schedule.games
        : [];

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      title: schedule?.title || "Upcoming Games",
      upcoming
    });
  } catch (err) {
    console.error("schedule api error:", err);
    res.status(500).json({
      error: "schedule api crashed",
      message: err?.message || String(err)
    });
  }
}
