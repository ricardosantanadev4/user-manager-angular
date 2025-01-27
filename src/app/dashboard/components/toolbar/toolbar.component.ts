import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() userLogout = new EventEmitter<boolean>(false);
  @Output() userToogleSidenav = new EventEmitter<boolean>(false);
  userName = '';

  // constructor(private userService: UserService) {
  //   this.getUserName();
  //   this.userService.setUserName(this.userName);
  // }

  SignOut() {
    this.userLogout.emit(true);
  }

  toogleSideNav() {
    this.userToogleSidenav.emit(true);
  }

  getUserName() {
    this.userName = 'Ricardo Santana';
  }

}
