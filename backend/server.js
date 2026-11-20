import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { initDatabase } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'intern_training_secret_key_2026'

app.use(cors())
app.use(express.json())

let pool

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access token required' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' })
    req.user = user
    next()
  })
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: process.env.DB_NAME || 'intern_training_db' })
})

// ==================== AUTH ROUTES ====================

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    if (!name || !username || !password) {
      return res.status(400).json({ message: 'Name, username, and password are required.' })
    }
    if (password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters.' })
    }

    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ? OR (email IS NOT NULL AND email = ?)',
      [username.trim(), email ? email.trim() : '']
    )
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Username or email is already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const cleanEmail = email && email.trim() ? email.trim() : null

    const [result] = await pool.query(
      'INSERT INTO users (name, username, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), username.trim(), cleanEmail, hashedPassword, 2]
    )

    const [newUsers] = await pool.query(
      `SELECT u.id, u.name, u.username, u.email, u.role_id, r.name AS role_name, u.created_at
       FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?`,
      [result.insertId]
    )

    const user = newUsers[0]
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role_name },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ message: 'Server error during signup: ' + err.message })
  }
})

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username (or email) and password are required.' })
    }

    const [rows] = await pool.query(
      `SELECT u.*, r.name AS role_name
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.username = ? OR u.email = ?
       LIMIT 1`,
      [username.trim(), username.trim()]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const dbUser = rows[0]
    const isMatch = await bcrypt.compare(password, dbUser.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const user = {
      id: dbUser.id,
      name: dbUser.name,
      username: dbUser.username,
      email: dbUser.email,
      role_id: dbUser.role_id,
      role_name: dbUser.role_name || 'Intern / Member',
      created_at: dbUser.created_at
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role_name },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      message: 'Login successful!',
      token,
      user
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error during login: ' + err.message })
  }
})

// ==================== DASHBOARD STATS ====================

app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users')
    const [[{ totalRoles }]] = await pool.query('SELECT COUNT(*) AS totalRoles FROM roles')
    const [recentUsers] = await pool.query(
      `SELECT u.id, u.name, u.username, u.email, COALESCE(r.name, 'Intern / Member') AS role_name, u.created_at
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       ORDER BY u.created_at DESC
       LIMIT 5`
    )

    res.json({
      totalUsers,
      totalRoles,
      recentUsers
    })
  } catch (err) {
    console.error('Dashboard error:', err)
    res.status(500).json({ message: 'Failed to load dashboard data.' })
  }
})

// ==================== USERS CRUD (for settings/User.vue) ====================

app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.username, u.email, u.role_id, COALESCE(r.name, 'Intern / Member') AS role_name, u.created_at
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       ORDER BY u.id ASC`
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/api/users', authenticateToken, async (req, res) => {
  try {
    const { name, username, email, password, role_id } = req.body
    if (!name || !username || !password) {
      return res.status(400).json({ message: 'Name, username, and password are required.' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const [result] = await pool.query(
      'INSERT INTO users (name, username, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), username.trim(), email || null, hashed, role_id || 2]
    )
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.username, u.email, u.role_id, COALESCE(r.name, 'Intern / Member') AS role_name
       FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?`,
      [result.insertId]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.put('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name, username, email, password, role_id } = req.body
    if (password && password.trim()) {
      const hashed = await bcrypt.hash(password, 10)
      await pool.query(
        'UPDATE users SET name = ?, username = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
        [name, username, email || null, hashed, role_id || 2, id]
      )
    } else {
      await pool.query(
        'UPDATE users SET name = ?, username = ?, email = ?, role_id = ? WHERE id = ?',
        [name, username, email || null, role_id || 2, id]
      )
    }
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.username, u.email, u.role_id, COALESCE(r.name, 'Intern / Member') AS role_name
       FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?`,
      [id]
    )
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.delete('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id])
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ==================== ROLES CRUD (for settings/Role.vue) ====================

app.get('/api/roles', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM roles ORDER BY id ASC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/api/roles', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) return res.status(400).json({ message: 'Role name is required.' })
    const [result] = await pool.query(
      'INSERT INTO roles (name, description) VALUES (?, ?)',
      [name.trim(), description || '']
    )
    res.status(201).json({ id: result.insertId, name: name.trim(), description: description || '' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.delete('/api/roles/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM roles WHERE id = ?', [req.params.id])
    res.json({ message: 'Role deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Start server after initializing MySQL
initDatabase()
  .then((dbPool) => {
    pool = dbPool
    app.listen(PORT, () => {
      console.log(`✅ MySQL connected & Backend API running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MySQL:', err.message)
    console.error('Make sure MySQL (XAMPP / Laragon / MySQL Service) is running and check backend/.env')
    process.exit(1)
  })
