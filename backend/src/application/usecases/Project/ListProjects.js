class ListProjects {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Lista projetos. Pode filtrar por owner.
   * @param {Object} filter - { owner }
   * @returns {Promise<Project[]>}
   */
  async execute(filter = {}) {
    return await this.projectRepository.list(filter);
  }
}

module.exports = ListProjects;
