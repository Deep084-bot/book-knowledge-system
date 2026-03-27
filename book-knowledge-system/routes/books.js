import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index.ejs");
})
router.get('/add', (req, res) => {
    res.render("addBook.ejs");
})
router.get('/edit', (req, res) => {
    res.render("editBook.ejs");
})

export default router;