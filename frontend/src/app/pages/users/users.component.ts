import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  error = '';
  success = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.list().subscribe({
      next: (res) => this.users = res,
      error: () => this.error = 'Erro ao carregar usuários'
    });
  }

  setRole(user: any, role: string) {
    this.userService.updateRole(user.id, role).subscribe({
      next: () => {
        this.success = `Permissão de ${user.name} atualizada para ${role}`;
        this.error = '';
        this.loadUsers();
      },
      error: () => {
        this.error = 'Erro ao atualizar permissão';
        this.success = '';
      }
    });
  }

  deleteUser(user: any) {
    if (confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      this.userService.delete(user.id).subscribe({
        next: () => {
          this.success = `Usuário ${user.name} excluído com sucesso`;
          this.error = '';
          this.loadUsers();
        },
        error: () => {
          this.error = 'Erro ao excluir usuário';
          this.success = '';
        }
      });
    }
  }
}
