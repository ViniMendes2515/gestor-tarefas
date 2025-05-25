const JwtService = require('./JwtService');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });
  const token = authHeader.split(' ')[1];
  const payload = JwtService.verifyToken(token);
  if (!payload) return res.status(401).json({ message: 'Token inválido' });
  req.user = payload; 
  next();
}

function authorizeRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorizeRole,
};
