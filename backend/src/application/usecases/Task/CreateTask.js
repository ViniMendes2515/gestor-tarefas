const Task = require('../../../domain/entities/Task');

class CreateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Cria uma nova tarefa.
   * @param {Object} data { title, description, project_id, assigned_to, status }
   * @returns {Promise<Task>}
   */
  async execute(data) {
    const task = new Task({
      id: null,
      title: data.title,
      description: data.description,
      project_id: data.project_id,
      assigned_to: data.assigned_to,
      status: data.status || 'pendente',
    });
    return await this.taskRepository.create(task);
  }
}

module.exports = CreateTask;
