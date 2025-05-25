const bcrypt = require('bcryptjs');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Autentica um usuário com email e senha.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User|null>} Usuário autenticado, ou null se falhar.
   */
  async execute(email, password) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }
}

module.exports = LoginUser;
