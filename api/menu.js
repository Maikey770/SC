import { readFileSync } from "node:fs";
import path from "node:path";

export default function handler(req, res) {
  try {
    // Absolute path to menu data
    const filePath = path.join(
      process.cwd(),
      "api",
      "data",
      "menu.json"
    );

    // Read and parse JSON
    const raw = readFileSync(filePath, "utf-8");
    const menu = JSON.parse(raw);

    // Disable caching
    res.setHeader("Cache-Control", "no-store");

    // Return menu data
    res.status(200).json(menu);
  } catch (err) {
    // Handle server error
    console.error("menu api error:", err);
    res.status(500).json({
      error: "menu api crashed",
      message: err.message
    });
  }
}
