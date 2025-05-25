const express = require('express');
const router = express.Router();

const TaskRepositorySQLite = require('../../infrastructure/repositories/TaskRepositorySQLite');
const CreateTask = require('../../application/usecases/Task/CreateTask');
const ListTasks = require('../../application/usecases/Task/ListTasks');
const UpdateTask = require('../../application/usecases/Task/UpdateTask');
const DeleteTask = require('../../application/usecases/Task/DeleteTask');
const { authenticate, authorizeRole } = require('../../infrastructure/auth/AuthMiddleware');

const taskRepository = new TaskRepositorySQLite();
const createTask = new CreateTask(taskRepository);
const listTasks = new ListTasks(taskRepository);
const updateTask = new UpdateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);

// Criar tarefa (admin)
router.post('/', authenticate, authorizeRole(['admin']), async (req, res) => {
  const task = await createTask.execute(req.body);
  res.status(201).json(task);
});

// Listar tarefas (admin vê tudo, colaborador vê só as atribuídas a ele)
router.get('/', authenticate, async (req, res) => {
  let filter = {};
  if (req.user.role === 'colaborador') filter.assigned_to = req.user.id;
  if (req.query.project_id) filter.project_id = req.query.project_id;
  const tasks = await listTasks.execute(filter);
  res.json(tasks);
});

// Atualizar tarefa (admin pode editar tudo; colaborador só pode atualizar status das suas tarefas)
router.put('/:id', authenticate, async (req, res) => {
  // Admin pode editar qualquer campo, colaborador só pode mudar status se for o assigned_to
  const task = await taskRepository.getById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

  if (req.user.role === 'colaborador') {
    if (task.assigned_to !== req.user.id)
      return res.status(403).json({ message: 'Acesso negado' });
    // só permite atualizar o status
    await updateTask.execute(req.params.id, { status: req.body.status });
  } else {
    // admin pode atualizar qualquer campo
    await updateTask.execute(req.params.id, req.body);
  }
  res.json({ message: 'Tarefa atualizada' });
});

// Remover tarefa (admin)
router.delete('/:id', authenticate, authorizeRole(['admin']), async (req, res) => {
  await deleteTask.execute(req.params.id);
  res.json({ message: 'Tarefa removida' });
});

module.exports = router;
