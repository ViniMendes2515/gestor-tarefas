class Task {
  constructor({ id, title, description, project_id, assigned_to, status }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.project_id = project_id;
    this.assigned_to = assigned_to; 
    this.status = status; 
  }
}
module.exports = Task;
