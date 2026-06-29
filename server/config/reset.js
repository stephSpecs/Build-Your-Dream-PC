import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false }
}

const pool = new pg.Pool(config)

const SQL = `
DROP TABLE IF EXISTS saved_builds CASCADE;

CREATE TABLE saved_builds (
  id SERIAL PRIMARY KEY,
  build_name VARCHAR(100) NOT NULL,
  cpu VARCHAR(100) NOT NULL,
  gpu VARCHAR(100) NOT NULL,
  ram VARCHAR(50) NOT NULL,
  storage VARCHAR(50) NOT NULL,
  case_color VARCHAR(50) NOT NULL,
  cooling VARCHAR(50) NOT NULL,
  psu VARCHAR(50) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO saved_builds (build_name, cpu, gpu, ram, storage, case_color, cooling, psu, total_price) VALUES
  ('Gaming Beast', 'AMD Ryzen 9 7950X', 'NVIDIA RTX 4090', '64GB DDR5', '2TB NVMe SSD', 'Midnight Black', 'Liquid 360mm', '1000W Platinum', 3149.99),
  ('Budget Builder', 'Intel Core i5-13400F', 'AMD RX 7600', '16GB DDR4', '500GB NVMe SSD', 'Arctic White', 'Air Tower', '650W Bronze', 699.99),
  ('Content Creator', 'AMD Ryzen 7 7700X', 'NVIDIA RTX 4070 Ti', '32GB DDR5', '1TB NVMe SSD', 'Stealth Grey', 'Liquid 240mm', '850W Gold', 1749.99);
`

async function setup() {
  try {
    await pool.query(SQL)
    console.log('✅ Database tables created and seeded successfully!')
  } catch (err) {
    console.error('❌ Error setting up database:', err)
  } finally {
    await pool.end()
  }
}

setup()
