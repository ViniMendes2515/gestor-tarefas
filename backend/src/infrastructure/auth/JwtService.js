const jwt = require('jsonwebtoken');
const SECRET = '123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz8901234567';

class JwtService {
  static generateToken(user) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return jwt.sign(payload, SECRET, { expiresIn: '2h' });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET);
    } catch {
      return null;
    }
  }
}

module.exports = JwtService;

