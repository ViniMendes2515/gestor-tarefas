const fs = require('fs');
const path = require('path');
const db = require('./src/infrastructure/db/database');
const bcrypt = require('bcryptjs');

const migrations = fs.readFileSync(path.join(__dirname, 'src/infrastructure/db/migration.sql'), 'utf-8');
db.exec(migrations, (err) => {
  if (err) throw err;

  // Cria usuários iniciais
  const passwordAdmin = bcrypt.hashSync('admin123', 10);
  const passwordColab = bcrypt.hashSync('colab123', 10);

  db.run('INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Admin', 'admin@email.com', passwordAdmin, 'admin']);
  db.run('INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Colaborador', 'colab@email.com', passwordColab, 'colaborador']);

  db.get('SELECT id FROM users WHERE email = ?', ['admin@email.com'], (err, adminUser) => {
    db.run('INSERT OR IGNORE INTO projects (name, description, owner) VALUES (?, ?, ?)', ['Projeto Inicial', 'Descrição do Projeto', adminUser.id], function () {
      db.get('SELECT id FROM projects WHERE name = ?', ['Projeto Inicial'], (err, project) => {
        db.get('SELECT id FROM users WHERE email = ?', ['colab@email.com'], (err, colabUser) => {
          db.run('INSERT OR IGNORE INTO tasks (title, description, project_id, assigned_to, status) VALUES (?, ?, ?, ?, ?)', [
            'Primeira tarefa', 'Fazer algo', project.id, colabUser.id, 'pendente'
          ]);
          db.run('INSERT OR IGNORE INTO tasks (title, description, project_id, assigned_to, status) VALUES (?, ?, ?, ?, ?)', [
            'Segunda tarefa', 'Fazer outra coisa', project.id, null, 'pendente'
          ], () => {
            console.log('Seed completo!');
            process.exit(0);
          });
        });
      });
    });
  });
});
