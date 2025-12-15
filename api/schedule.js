import schedule from "../src/data/schedule.json" assert { type: "json" };

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(schedule);
}
