import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UserService    } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserAutocompleteComponent } from '../../components/user-autocomplete/user-autocomplete.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, UserAutocompleteComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  users: any[] = [];
  newProject = { name: '', description: '', owner: '' };
  error = '';
  editingProject: any = null;
  editingOwnerName = '';


  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.userService.list().subscribe({
      next: (res) => this.users = res,
      error: () => this.error = 'Erro ao carregar usuários'
    });
  }

  loadProjects() {
    this.projectService.list().subscribe({
      next: (res) => this.projects = res,
      error: (err) => this.error = 'Erro ao carregar projetos'
    });
  }

  createProject() {
    this.projectService.create(this.newProject).subscribe({
      next: () => {
        this.newProject = { name: '', description: '', owner: '' };
        this.loadProjects();
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

  startEdit(project: any) {
    this.editingProject = { ...project };
    const ownerUser = this.users.find(u => u.id === project.owner);
    this.editingOwnerName = ownerUser ? ownerUser.name : '';
  }

  cancelEdit() {
    this.editingProject = null;
  }

  saveEdit() {
    if (!this.editingProject) return;
    this.projectService.update(this.editingProject.id, this.editingProject).subscribe({
      next: () => {
        this.editingProject = null;
        this.loadProjects();
      },
      error: (err) => {
        this.error = 'Erro ao atualizar projeto';
      }
    });
  }

  deleteProject(project: any) {
    if (confirm(`Tem certeza que deseja remover o projeto "${project.name}"?`)) {
      this.projectService.delete(project.id).subscribe({
        next: () => this.loadProjects(),
        error: () => this.error = 'Erro ao remover projeto'
      });
    }
  }
}
