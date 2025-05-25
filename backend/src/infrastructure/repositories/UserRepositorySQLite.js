const UserRepository = require('../../domain/repositories/UserRepository');
const User = require('../../domain/entities/User');
const db = require('../db/database');

class UserRepositorySQLite extends UserRepository {
  async create(user) {
    return new Promise((resolve, reject) => {
      const { name, email, password, role } = user;
      db.run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role],
        function (err) {
          if (err) return reject(err);
          resolve(new User({ id: this.lastID, name, email, password, role }));
        }
      );
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new User(row));
      });
    });
  }

  async getByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new User(row));
      });
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
      if (data.email !== undefined) { fields.push('email = ?'); values.push(data.email); }
      if (data.password !== undefined) { fields.push('password = ?'); values.push(data.password); }
      if (data.role !== undefined) { fields.push('role = ?'); values.push(data.role); }
      if (fields.length === 0) return resolve();
      values.push(id);
      const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      db.run(sql, values, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return reject(err);
        const users = rows.map(row => new User(row));
        resolve(users);
      });
    });
  }
}

module.exports = UserRepositorySQLite;
