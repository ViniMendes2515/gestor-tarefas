class ListTasks {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Lista tarefas. Pode filtrar por projeto ou usuário.
   * @param {Object} filter { project_id, assigned_to }
   * @returns {Promise<Task[]>}
   */
  async execute(filter = {}) {
    return await this.taskRepository.list(filter);
  }
}

module.exports = ListTasks;
