CREATE DATABASE IF NOT EXISTS intern_training_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE intern_training_db;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  username VARCHAR(80) NOT NULL UNIQUE,
  email VARCHAR(150) DEFAULT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

INSERT IGNORE INTO roles (id, name, description) VALUES
  (1, 'Administrator', 'Full system access and user management'),
  (2, 'Intern / Member', 'Standard dashboard and training workspace access'),
  (3, 'Librarian', 'Manage RFID library catalog and circulation');
