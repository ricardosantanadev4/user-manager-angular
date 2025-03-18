import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { TokenService } from '../../../shared/services/token.service';
// import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  @Output() userLogout = new EventEmitter<boolean>(false);
  @Output() userToogleSidenav = new EventEmitter<boolean>(false);
  userName = '';

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getUserName()
  }


  SignOut() {
    this.userLogout.emit(true);
  }

  toogleSideNav() {
    this.userToogleSidenav.emit(true);
  }

  getUserName() {
    // this.userName = 'Ricardo Santana';
    this.userName = this.tokenService.getUserName();
  }

}
