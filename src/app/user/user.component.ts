import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { BotService, UserService, AuthService } from '../_services';
import { User, Role } from '../_models'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  id: number;
  logo: string;

  constructor(
    private bot: BotService,
    private userService: UserService,
    private authenticationService: AuthService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.id = history.state.data !== undefined ? history.state.data : this.currentUser.id;
  }

  ngOnInit(): void {
    this.userService.getById(this.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
      this.setImg()
    });
  }

  setImg() {
    if (this.currentUser) {

      this.logo = "../../assets/" + this.userFromApi.id + ".png";
    }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isEmpresa() {
    return this.currentUser && this.currentUser.role === Role.Empresa;
  }
}