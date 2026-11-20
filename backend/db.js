import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'intern_training_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export async function initDatabase() {
  const { database, ...serverConfig } = dbConfig
  const conn = await mysql.createConnection(serverConfig)
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  )
  await conn.end()

  const pool = mysql.createPool(dbConfig)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      username VARCHAR(80) NOT NULL UNIQUE,
      email VARCHAR(150) DEFAULT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role_id INT DEFAULT 2,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
    )
  `)

  await pool.query(`
    INSERT IGNORE INTO roles (id, name, description) VALUES
      (1, 'Administrator', 'Full system access and user management'),
      (2, 'Intern / Member', 'Standard dashboard and training workspace access'),
      (3, 'Librarian', 'Manage RFID library catalog and circulation')
  `)

  // Seed default admin account if no users exist yet
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users')
  if (rows[0].count === 0) {
    const hashed = await bcrypt.hash('admin123', 10)
    await pool.query(
      'INSERT INTO users (name, username, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
      ['Admin User', 'admin', 'admin@example.com', hashed, 1]
    )
  }

  return pool
}
