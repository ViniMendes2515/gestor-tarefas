const express = require('express');
const router = express.Router();

const UserRepositorySQLite = require('../../infrastructure/repositories/UserRepositorySQLite');
const LoginUser = require('../../application/usecases/Auth/LoginUser');
const JwtService = require('../../infrastructure/auth/JwtService');

const userRepository = new UserRepositorySQLite();
const loginUser = new LoginUser(userRepository);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser.execute(email, password);
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
  const token = JwtService.generateToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
