import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { IUsuarioPage } from '../models/usuario-page.interface';
import { IUsuario } from '../models/usuario.interface';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = 'https://user-manager-r1k9.onrender.com';
  constructor(
    private daoService: DaoService,
    private http: HttpClient,
  ) { }

  public listarUsuariosPaginados(page: number, size: number, search?: string): Observable<HttpResponse<IUsuarioPage>> {
    return this.daoService.get<IUsuarioPage>(`${this.apiUrl}${AppSettings.USUARIOS}?page=${page}&size=${size}&search=${search}`,
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
}