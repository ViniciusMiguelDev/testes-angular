import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { name: 'João', email: 'joao@email.com' },
    { name: 'Maria', email: 'maria@email.com' },
  ];

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
