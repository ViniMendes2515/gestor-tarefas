class UpdateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Atualiza uma tarefa.
   * @param {string|number} id
   * @param {Partial<Task>} data
   * @returns {Promise<void>}
   */
  async execute(id, data) {
    await this.taskRepository.update(id, data);
  }
}

module.exports = UpdateTask;
