// Vercel endpoint for schedule data
import schedule from "./schedule.json";

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(schedule);
}
