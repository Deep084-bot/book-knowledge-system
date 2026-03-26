import express from "express";
import dotenv from "dotenv";
import booksRouter from "./routes/books.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use('/', booksRouter);

app.listen(port, () => {
    console.log(`Server is running at port ${port}.`);
});
