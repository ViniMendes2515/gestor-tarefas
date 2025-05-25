class UpdateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Atualiza um projeto.
   * @param {string|number} id
   * @param {Partial<Project>} data
   * @returns {Promise<void>}
   */
  async execute(id, data) {
    await this.projectRepository.update(id, data);
  }
}

module.exports = UpdateProject;
