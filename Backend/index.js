const express = require('express')
const db = require('./db')
const app = express()
const Port = 5000;

app.use(express.json());

app.post('/add-expenses', (req, res) => {
  const { title, amount, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO expenses (title, amount, date) VALUES (?, ?, ?)';
  db.query(sql, [title, amount, date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Expense added successfully', id: result.insertId });
  });
});

app.get('/expenses', (req, res) => {
  const sql = 'SELECT * FROM expenses ORDER BY date DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Sends array of expenses as JSON
  });
});

app.delete('/delete/:id', (req, res) => {
  const {id} = req.params
   const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'UPDATE expenses SET title = ?, amount = ?, date = ? WHERE id = ?';
  db.query(sql, [title, amount, date, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense updated successfully' });
  });
});

app.listen(Port, () => {
  console.log(`app is listing on port ${Port}`)
})