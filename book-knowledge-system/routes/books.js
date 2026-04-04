import express from "express";
import * as bookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/add", bookController.renderAddPage);
router.post("/books", bookController.createBook);
router.get("/edit/:id", bookController.renderEditPage);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

// router.get('/', (req, res) => {
//     res.render("index.ejs");
// })
// router.get('/add', (req, res) => {
//     res.render("addBook.ejs");
// })
// router.get('/edit', (req, res) => {
//     res.render("editBook.ejs");
// })

export default router;