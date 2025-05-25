import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserAutocompleteComponent } from '../../components/user-autocomplete/user-autocomplete.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, UserAutocompleteComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  projects: any[] = [];
  newTask = {
    title: '',
    description: '',
    project_id: '',
    assigned_to: '',
    status: 'pendente'
  };
  error = '';
  user: any;

  userNames: { [key: string]: string } = {};

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();

    this.loadTasks();
    this.loadProjects();
  }

  loadTasks() {
    this.taskService.list().subscribe({
      next: (res) => this.tasks = res,
      error: (err) => this.error = 'Erro ao carregar tarefas'
    });
  }

  loadProjects() {
    this.projectService.list().subscribe({
      next: (res) => this.projects = res,
      error: (err) => {}
    });
  }

  createTask() {
    this.taskService.create(this.newTask).subscribe({
      next: () => {
        this.newTask = {
          title: '',
          description: '',
          project_id: '',
          assigned_to: '',
          status: 'pendente'
        };
        this.loadTasks();
      },
      error: (err) => {
        if (err.status === 403) {
          this.error = err.error?.message || 'Acesso negado';
        } else {
          this.error = 'Erro ao criar projeto';
        }
      }
    });
  }

  updateTaskStatus(task: any, status: string) {
    this.taskService.update(task.id, { status }).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Erro ao atualizar status'
    });
  }

  deleteTask(task: any) {
    if (confirm('Tem certeza que deseja remover esta tarefa?')) {
      this.taskService.delete(task.id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => {
          if (err.status === 403) {
            this.error = err.error?.message || 'Acesso negado';
          }
          else{
            this.error = 'Erro ao remover tarefa';
          }
        }
      });
    }
  }

  getProjectName(projectId: string) {
    const project = this.projects.find(p => p.id == projectId);
    return project ? project.name : projectId;
  }

  getUserName(userId: string) {
    if (!userId) return '';
    if (this.userNames[userId]) return this.userNames[userId];
    this.userService.getById(Number(userId)).subscribe({
      next: (user) => this.userNames[userId] = user.name,
      error: () => this.userNames[userId] = userId
    });
    return this.userNames[userId] || userId;
  }

}
