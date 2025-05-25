class DeleteProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Remove um projeto.
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async execute(id) {
    await this.projectRepository.delete(id);
  }
}

module.exports = DeleteProject;
