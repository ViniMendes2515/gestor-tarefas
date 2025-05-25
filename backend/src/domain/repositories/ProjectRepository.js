class ProjectRepository {
  /**
   * Cria um novo projeto.
   * @param {Project} project
   * @returns {Promise<Project>}
   */
  create(project) { throw new Error('Not implemented'); }

  /**
   * Busca um projeto pelo ID.
   * @param {string|number} id
   * @returns {Promise<Project|null>}
   */
  getById(id) { throw new Error('Not implemented'); }

  /**
   * Lista todos os projetos, podendo filtrar por owner (id do usuário proprietário).
   * @param {Object} [filter] - { owner }
   * @returns {Promise<Project[]>}
   */
  list(filter = {}) { throw new Error('Not implemented'); }

  /**
   * Atualiza um projeto pelo ID.
   * @param {string|number} id
   * @param {Partial<Project>} data
   * @returns {Promise<void>}
   */
  update(id, data) { throw new Error('Not implemented'); }

  /**
   * Remove um projeto pelo ID.
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  delete(id) { throw new Error('Not implemented'); }
}

module.exports = ProjectRepository;
