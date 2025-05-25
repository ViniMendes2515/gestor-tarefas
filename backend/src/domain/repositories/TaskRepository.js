class TaskRepository {
  /**
   * Cria uma nova tarefa.
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  create(task) { throw new Error('Not implemented'); }

  /**
   * Busca uma tarefa pelo ID.
   * @param {string|number} id
   * @returns {Promise<Task|null>}
   */
  getById(id) { throw new Error('Not implemented'); }

  /**
   * Lista tarefas, podendo filtrar por projeto ou usuário.
   * @param {Object} [filter] - { project_id, assigned_to }
   * @returns {Promise<Task[]>}
   */
  list(filter = {}) { throw new Error('Not implemented'); }

  /**
   * Atualiza uma tarefa pelo ID.
   * @param {string|number} id
   * @param {Partial<Task>} data
   * @returns {Promise<void>}
   */
  update(id, data) { throw new Error('Not implemented'); }

  /**
   * Remove uma tarefa pelo ID.
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  delete(id) { throw new Error('Not implemented'); }
}

module.exports = TaskRepository;
