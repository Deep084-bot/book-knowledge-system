// https://covers.openlibrary.org/b/id/{cover_i}-M.jpg - Covers API
// https://openlibrary.org/search.json - Search API

import axios from "axios";

export async function getBookData(title) {
  try {
    const response = await axios.get(
      "https://openlibrary.org/search.json",
      {
        params: { title },
      }
    );

    const docs = response.data.docs;

    if (!docs || docs.length === 0) {
      throw new Error("Book not found");
    }

    const book = docs[0];

    return {
      title: book.title || title,
      author: book.author_name ? book.author_name[0] : "Unknown",
      publish_year: book.first_publish_year || null,
      cover_url: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/150",
    };

  } catch (error) {
    console.error("OpenLibrary API Error:", error.message);
    throw error;
  }
}