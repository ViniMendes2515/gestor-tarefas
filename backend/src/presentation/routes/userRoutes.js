const express = require('express');
const router = express.Router();

const UserRepositorySQLite = require('../../infrastructure/repositories/UserRepositorySQLite');
const CreateUser = require('../../application/usecases/User/CreateUser');
const GetUser = require('../../application/usecases/User/GetUser');
const { authenticate, authorizeRole } = require('../../infrastructure/auth/AuthMiddleware');

const userRepository = new UserRepositorySQLite();
const createUser = new CreateUser(userRepository);
const getUser = new GetUser(userRepository);

// Criar usuário (apenas admin)
router.post('/', authenticate, authorizeRole(['admin']), async (req, res) => {
  const user = await createUser.execute(req.body);
  res.status(201).json(user);
});

// Buscar usuário por id 
router.get('/:id', authenticate, async (req, res) => {
  const user = await getUser.execute(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
});

// Registrar usuário
router.post('/register', async (req, res) => {
  try {
    const existing = await userRepository.getByEmail(req.body.email);
    if (existing) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }
    const data = { ...req.body, role: 'colaborador' };
    const user = await createUser.execute(data);
    res.status(201).json(user);
  } catch (err) { 
    res.status(400).json({ message: 'Erro ao registrar usuário', error: err.message });
  }
});

// Buscar todos os usuários (apenas admin)
router.get('/', authenticate, authorizeRole(['admin']), async (req, res) => {
  const users = await userRepository.getAll();
  res.json(users);
});

// Atualizar usuário (apenas admin)
router.put('/:id/role', authenticate, authorizeRole(['admin']), async (req, res) => {
  const { role } = req.body;
  if (!['admin', 'colaborador'].includes(role)) {
    return res.status(400).json({ message: 'Role inválido' });
  }
  await userRepository.update(req.params.id, { role });
  res.json({ message: 'Permissão atualizada' });
});

// Remover usuário (apenas admin)
router.delete('/:id', authenticate, authorizeRole(['admin']), async (req, res) => {
  await userRepository.delete(req.params.id);
  res.json({ message: 'Usuário removido' });
});

module.exports = router;
