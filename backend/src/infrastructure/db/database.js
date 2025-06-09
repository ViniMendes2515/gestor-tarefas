const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../../data/data.db'); 
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados", err.message);
    const dataDir = path.dirname(dbPath);
    const fs = require('fs');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const newDb = new sqlite3.Database(dbPath);
    module.exports = newDb;
    return;
  }
});

module.exports = db;