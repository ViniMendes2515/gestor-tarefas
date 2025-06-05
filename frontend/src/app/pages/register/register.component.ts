import { Component } from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.success = 'Conta criada com sucesso! Faça login.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erro ao criar conta';
        this.success = '';
      }
    });
  }
}
