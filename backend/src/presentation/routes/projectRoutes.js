const express = require('express');
const router = express.Router();

const ProjectRepositorySQLite = require('../../infrastructure/repositories/ProjectRepositorySQLite');
const CreateProject = require('../../application/usecases/Project/CreateProject');
const ListProjects = require('../../application/usecases/Project/ListProjects');
const UpdateProject = require('../../application/usecases/Project/UpdateProject');
const DeleteProject = require('../../application/usecases/Project/DeleteProject');
const { authenticate, authorizeRole } = require('../../infrastructure/auth/AuthMiddleware');

const projectRepository = new ProjectRepositorySQLite();
const createProject = new CreateProject(projectRepository);
const listProjects = new ListProjects(projectRepository);
const updateProject = new UpdateProject(projectRepository);
const deleteProject = new DeleteProject(projectRepository);

// Criar projeto (admin)
router.post('/', authenticate, authorizeRole(['admin']), async (req, res) => {
  const project = await createProject.execute(req.body);
  res.status(201).json(project);
});

// Listar projetos (admin)
router.get('/', authenticate, async (req, res) => {
  let filter = {};
  const projects = await listProjects.execute(filter);
  res.json(projects);
});

// Atualizar projeto (admin)
router.put('/:id', authenticate, authorizeRole(['admin']), async (req, res) => {
  await updateProject.execute(req.params.id, req.body);
  res.json({ message: 'Projeto atualizado' });
});

// Remover projeto (admin)
router.delete('/:id', authenticate, authorizeRole(['admin']), async (req, res) => {
  await deleteProject.execute(req.params.id);
  res.json({ message: 'Projeto removido' });
});

module.exports = router;
