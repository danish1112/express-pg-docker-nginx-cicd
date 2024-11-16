const express = require('express');
const { pool } = require('./models/db');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    console.log("hello");
    res.send('Welcome to the CRUD App!!!')
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('Healthy');
  } catch {
    res.status(500).send('Unhealthy');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
