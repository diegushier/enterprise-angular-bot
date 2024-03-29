import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faBullseye } from '@fortawesome/free-solid-svg-icons';

import { AuthService, BotService } from './_services';
import { User, Role } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentel-bot';
  faCog = faCog;
  faBullseye = faBullseye;
  currentUser: User;

  public logo;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private bot: BotService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.setImg()
  }

  setImg() {
    if (this.currentUser && !this.isAdmin) {
      this.logo = "./assets/" + this.currentUser.empresa + ".png";
    } else {
      this.logo = "./favicon.ico";
    }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isEmpresa() {
    this.setImg();
    return this.currentUser && this.currentUser.role === Role.Empresa;
  }
  
  get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
  }
  
  getStatus() {
    return this.bot.getStatus()
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
