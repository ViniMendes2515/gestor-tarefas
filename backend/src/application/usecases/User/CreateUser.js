const bcrypt = require('bcryptjs');
const User = require('../../../domain/entities/User');

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Cria um novo usuário.
   * @param {Object} data { name, email, password, role }
   * @returns {Promise<User>}
   */
  async execute(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
      id: null,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'colaborador',
    });
    return await this.userRepository.create(user);
  }
}

module.exports = CreateUser;
