import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { AppSettings } from '../../app.settings';
import { AppState } from '../../app.state';
import { ILogin } from '../models/login.interface';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // private readonly apiUrl = 'https://user-manager-spring.onrender.com';
  // private readonly apiUrl = '';
  private readonly apiUrl = environment.apiUrl;
  
  private jwtHelper = new JwtHelperService();

  constructor(private daoService: DaoService, private state: AppState,) { }

  // Daqui para a baixo ficam as configurações de token do usuário.

  public login(body: ILogin) {
    return this.daoService.post<ILogin>(`${this.apiUrl}${AppSettings.LOGIN}`, body,
      DaoService.MEDIA_TYPE_APP_JSON);
  }

  get usuarioLogado(): boolean {
    return this.token && this.token.length > 10 ? true : false;
  }

  get token(): string {
    return this.state.token;
  }

  set token(token: string) {
    this.state.token = token;
  }

  clearToken() {
    this.state.clearToken();
  }

  getUserName() {
    const decodedToken = this.decodeToken();
    return decodedToken.nome;
  }

  decodeToken() {
    const token = this.token;
    return this.jwtHelper.decodeToken(token);
  }

  isUser(): boolean {
    return this.getUserRole() === 'ROLE_USER';
  }

  getUserRole(): string {
    const decodedToken = this.decodeToken();
    return decodedToken.role;
  }
}
