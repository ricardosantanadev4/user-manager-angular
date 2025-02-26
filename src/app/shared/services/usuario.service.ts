import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { AppState } from '../../app.state';
import { ILogin } from '../models/login.interface';
import { IUsuarioPage } from '../models/usuario-page.interface';
import { IUsuario } from '../models/usuario.interface';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'https://user-manager-spring.onrender.com';
  // private readonly apiUrl = '';
  private jwtHelper = new JwtHelperService();

  constructor(
    private daoService: DaoService,
    private http: HttpClient,
    private state: AppState,
  ) { }

  public listarUsuariosPaginados(page: number, size: number, search?: string, dataInicial?: string, dataFinal?: string): Observable<HttpResponse<IUsuarioPage>> {
    return this.daoService.get<IUsuarioPage>(`${this.apiUrl}${AppSettings.USUARIOS}?page=${page}
      &size=${size}&search=${search}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`,
      DaoService.MEDIA_TYPE_APP_JSON);
  }

  public buscarUsuarioPorId(usuarioId: number) {
    return this.daoService.get<IUsuario>(`${this.apiUrl}${AppSettings.USUARIOS}/${usuarioId}`,
      DaoService.MEDIA_TYPE_APP_JSON);
  }

  public criarUsuario(usuario: IUsuario) {
    return this.daoService.post<IUsuario>(`${this.apiUrl}${AppSettings.CRIARUSUARIO}`, usuario,
      DaoService.MEDIA_TYPE_APP_JSON);
  }

  public editarUsuario(usuario: IUsuario) {
    return this.daoService.put<IUsuario>(`${this.apiUrl}${AppSettings.USUARIOS}/${usuario.id}`, usuario,
      DaoService.MEDIA_TYPE_APP_JSON);
  }

  public removerUsuario(usuarioId: number) {
    return this.daoService.delete<IUsuario>(`${this.apiUrl}${AppSettings.USUARIOS}/${usuarioId}`,
      DaoService.MEDIA_TYPE_APP_JSON);
  }

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

  isUser(): boolean {
    return this.getUserRole() === 'ROLE_USER';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }

  getUserName() {
    const decodedToken = this.decodeToken();
    return decodedToken.name;
  }

  getUserRole(): string {
    const decodedToken = this.decodeToken();
    return decodedToken.role;
  }

  decodeToken() {
    const token = this.token;
    return this.jwtHelper.decodeToken(token);
  }

}
