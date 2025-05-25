const TaskRepository = require('../../domain/repositories/TaskRepository');
const Task = require('../../domain/entities/Task');
const db = require('../db/database');

class TaskRepositorySQLite extends TaskRepository {
  async create(task) {
    return new Promise((resolve, reject) => {
      const { title, description, project_id, assigned_to, status } = task;
      db.run(
        'INSERT INTO tasks (title, description, project_id, assigned_to, status) VALUES (?, ?, ?, ?, ?)',
        [title, description, project_id, assigned_to, status],
        function (err) {
          if (err) return reject(err);
          resolve(new Task({ id: this.lastID, title, description, project_id, assigned_to, status }));
        }
      );
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new Task(row));
      });
    });
  }

  async list(filter = {}) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tasks';
      let params = [];
      const where = [];
      if (filter.project_id) { where.push('project_id = ?'); params.push(filter.project_id); }
      if (filter.assigned_to) { where.push('assigned_to = ?'); params.push(filter.assigned_to); }
      if (where.length > 0) {
        query += ' WHERE ' + where.join(' AND ');
      }
      db.all(query, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(row => new Task(row)));
      });
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
      if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
      if (data.project_id !== undefined) { fields.push('project_id = ?'); values.push(data.project_id); }
      if (data.assigned_to !== undefined) { fields.push('assigned_to = ?'); values.push(data.assigned_to); }
      if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
      values.push(id);
      const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
      db.run(sql, values, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = TaskRepositorySQLite;
