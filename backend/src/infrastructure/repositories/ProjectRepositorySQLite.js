const ProjectRepository = require('../../domain/repositories/ProjectRepository');
const Project = require('../../domain/entities/Project');
const db = require('../db/database');

class ProjectRepositorySQLite extends ProjectRepository {
  async create(project) {
    return new Promise((resolve, reject) => {
      const { name, description, owner } = project;
      db.run(
        'INSERT INTO projects (name, description, owner) VALUES (?, ?, ?)',
        [name, description, owner],
        function (err) {
          if (err) return reject(err);
          resolve(new Project({ id: this.lastID, name, description, owner }));
        }
      );
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve(new Project(row));
      });
    });
  }

  async list(filter = {}) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM projects';
      let params = [];
      if (filter.owner) {
        query += ' WHERE owner = ?';
        params.push(filter.owner);
      }
      db.all(query, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(row => new Project(row)));
      });
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
      if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
      if (data.owner !== undefined) { fields.push('owner = ?'); values.push(data.owner); }
      values.push(id);
      const sql = `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`;
      db.run(sql, values, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = ProjectRepositorySQLite;
