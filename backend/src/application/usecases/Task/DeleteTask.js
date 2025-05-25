class DeleteTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Remove uma tarefa.
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async execute(id) {
    await this.taskRepository.delete(id);
  }
}

module.exports = DeleteTask;
