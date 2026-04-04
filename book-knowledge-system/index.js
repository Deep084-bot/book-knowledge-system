import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";

import bookRoutes from "./routes/books.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", bookRoutes);
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});