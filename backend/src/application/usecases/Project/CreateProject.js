const Project = require('../../../domain/entities/Project');

class CreateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Cria um novo projeto.
   * @param {Object} data { name, description, owner }
   * @returns {Promise<Project>}
   */
  async execute(data) {
    const project = new Project({
      id: null,
      name: data.name,
      description: data.description,
      owner: data.owner,
    });
    return await this.projectRepository.create(project);
  }
}

module.exports = CreateProject;
