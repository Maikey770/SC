// Vercel endpoint for menu data
import menu from "./menu.json";

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(menu);
}
