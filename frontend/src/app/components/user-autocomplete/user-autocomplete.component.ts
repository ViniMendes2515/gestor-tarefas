import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./user-autocomplete.component.css']
})
export class UserAutocompleteComponent implements OnInit {
  @Input() placeholder = 'Buscar usuário';
  @Input() userId: string = '';
  @Output() userIdChange = new EventEmitter<string>();

  users: any[] = [];
  search = '';
  suggestions: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.list().subscribe(users => this.users = users);
    if (this.userId) {
      const user = this.users.find(u => u.id === this.userId);
      if (user) this.search = user.name;
    }
  }

  onInput() {
    const s = this.search.toLowerCase();
    this.suggestions = this.users.filter(u => u.name.toLowerCase().includes(s));
  }

  selectUser(user: any) {
    this.search = user.name;
    this.userIdChange.emit(user.id);
    this.suggestions = [];
  }
}
