// controllers/bookController.js

import pool from "../models/db.js";
import { getBookData } from "../services/openLibraryService.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, rating, tags, notes } = req.body;

    // 1. Get data from Open Library
    const apiData = await getBookData(title);

    const finalTitle = apiData.title;
    const finalAuthor = apiData.author || author;
    const cover_url = apiData.cover_url;
    const publish_year = apiData.publish_year;

    // 2. Insert into books
    const bookResult = await pool.query(
      `INSERT INTO books (title, author, cover_url, publish_year)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [finalTitle, finalAuthor, cover_url, publish_year]
    );

    const bookId = bookResult.rows[0].id;

    // 3. Insert into reviews
    await pool.query(
      `INSERT INTO reviews (book_id, rating, notes)
       VALUES ($1, $2, $3)`,
      [bookId, rating || null, notes || null]
    );

    // 4. Handle tags
    if (tags) {
      const tagArray = tags.split(",").map(t => t.trim());

      for (let tagName of tagArray) {
        if (!tagName) continue;

        // Insert tag if not exists
        const tagResult = await pool.query(
          `INSERT INTO tags (name)
           VALUES ($1)
           ON CONFLICT (name) DO NOTHING
           RETURNING id`,
          [tagName]
        );

        let tagId;

        if (tagResult.rows.length > 0) {
          tagId = tagResult.rows[0].id;
        } else {
          const existingTag = await pool.query(
            `SELECT id FROM tags WHERE name = $1`,
            [tagName]
          );
          tagId = existingTag.rows[0].id;
        }

        // Insert into book_tags
        await pool.query(
          `INSERT INTO book_tags (book_id, tag_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [bookId, tagId]
        );
      }
    }

    // 5. Redirect
    res.redirect("/");

  } catch (error) {
    console.error("Create Book Error:", error.message);
    res.status(500).send("Error creating book");
  }
};

export const getAllBooks = (req, res) => {
  res.render("index", { books: [] });
};

export const renderAddPage = (req, res) => {
  res.render("addBook");
};

export const renderEditPage = (req, res) => {
  res.render("editBook", { book: {} });
};

export const updateBook = (req, res) => {
  res.send("Update Book");
};

export const deleteBook = (req, res) => {
  res.send("Delete Book");
};