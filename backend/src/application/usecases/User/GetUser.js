class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Busca usuário por ID.
   * @param {string|number} id
   * @returns {Promise<User|null>}
   */
  async execute(id) {
    return await this.userRepository.getById(id);
  }
}

module.exports = GetUser;
