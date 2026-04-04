import express from "express";
import { getBookData } from "../services/openLibraryService.js";

const router = express.Router();

// GET /api/book-info?title=xyz
router.get("/book-info", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const data = await getBookData(title);

    res.json(data);

  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch book data" });
  }
});

export default router;