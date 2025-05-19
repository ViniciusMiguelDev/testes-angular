import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './app.component.css',
  template: `
    <h1>Gerenciador de Usuários 🧑‍💻</h1>

    <form (ngSubmit)="onSubmit()" #userForm="ngForm">
      <input
        type="text"
        placeholder="Nome"
        [(ngModel)]="newName"
        name="name"
        required
      />
      <input
        type="email"
        placeholder="Email"
        [(ngModel)]="newEmail"
        name="email"
        required
      />
      <button type="submit" [disabled]="userForm.invalid">
        {{ isEditMode ? 'Salvar' : 'Adicionar' }}
      </button>
      <button
        type="button"
        *ngIf="isEditMode"
        (click)="cancelEdit()"
        style="margin-left: 0.5rem"
      >
        Cancelar
      </button>
    </form>

    <ul>
      <li *ngFor="let user of users; let i = index">
        {{ user.name }} - {{ user.email }}
        <button (click)="startEdit(i)">Editar</button>
        <button (click)="deleteUser(i)">Excluir</button>
      </li>
    </ul>
  `,
  styles: [
    `
      h1 {
        font-family: Arial, sans-serif;
        margin-bottom: 1rem;
      }
      form {
        margin-bottom: 1rem;
      }
      input {
        margin-right: 0.5rem;
        padding: 0.3rem;
      }
      button {
        cursor: pointer;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 0.5rem;
        font-family: Arial, sans-serif;
      }
    `,
  ],
})
export class AppComponent {
  users: User[] = [];
  newName = '';
  newEmail = '';
  isEditMode = false;
  editIndex: number | null = null;

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }

  onSubmit() {
    if (!this.newName || !this.newEmail) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.isEditMode && this.editIndex !== null) {
      // Atualiza usuário existente
      this.users[this.editIndex] = { name: this.newName, email: this.newEmail };
      this.isEditMode = false;
      this.editIndex = null;
    } else {
      // Adiciona novo usuário
      this.userService.addUser({
        name: this.newName,
        email: this.newEmail,
      });
    }

    this.newName = '';
    this.newEmail = '';
  }

  startEdit(index: number) {
    const user = this.users[index];
    this.newName = user.name;
    this.newEmail = user.email;
    this.isEditMode = true;
    this.editIndex = index;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editIndex = null;
    this.newName = '';
    this.newEmail = '';
  }

  deleteUser(index: number) {
    this.userService.deleteUser(index);
  }
}
