import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// test
pool.connect()
  .then(() => console.log("Connected to PostgreSQL (Neon)"))
  .catch(err => console.error("DB connection error:", err));

export default pool;