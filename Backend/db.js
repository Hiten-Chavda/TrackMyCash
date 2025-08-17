const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',   
  port: 3306,          
  user: 'root',        
  password: 'password',
  database: 'expenses'    
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('MySQL Connected...');
});

module.exports = db;
