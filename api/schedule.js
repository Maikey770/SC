import schedule from "../src/data/schedule.json";

export default function handler(req, res) {
  res.status(200).json(schedule);
}
