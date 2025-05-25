import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  role: string = '';
  projects: any[] = [];
  tasks: any[] = [];
  tasksPendentes: any[] = [];
  tasksConcluidas: any[] = [];

  constructor(
    private auth: AuthService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.role = this.user?.role || '';

    this.projectService.list().subscribe({
      next: (projects) => {
        if (this.role === 'colaborador') {
          this.projects = projects.filter((p: any) => p.owner === this.user.id);
        } else {
          this.projects = projects;
        }
      }
    });

    this.taskService.list().subscribe({
      next: (tasks) => {
        if (this.role === 'colaborador') {
          this.tasks = tasks.filter((t: any) => t.assigned_to === this.user.id);
        } else {
          this.tasks = tasks;
        }
        this.tasksPendentes = this.tasks.filter((t: any) => t.status === 'pendente');
        this.tasksConcluidas = this.tasks.filter((t: any) => t.status === 'concluída');
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
