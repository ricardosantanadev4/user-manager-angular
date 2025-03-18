import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  public static readonly MEDIA_TYPE_APP_JSON = 'application/json';

  constructor(
    private httpClient: HttpClient,
    private state: AppState,
  ) { }

  post<T>(url: string, body: any, mediaType: string): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(url, body, { headers: this.getHeaders(mediaType), observe: 'response' });
  }

  put<T>(url: string, body: any, mediaType: string): Observable<HttpResponse<T>> {
    return this.httpClient.put<T>(url, body, { headers: this.getHeaders(mediaType), observe: 'response' });
  }

  get<T>(url: string, mediaType: string): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(url, { headers: this.getHeaders(mediaType), observe: 'response' });
  }

  delete<T>(url: string, mediaType: string): Observable<HttpResponse<T>> {
    return this.httpClient.delete<T>(url, { headers: this.getHeaders(mediaType), observe: 'response' });
  }

  // Novo método para baixar arquivos (com 'blob')
  getFile(url: string): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(url, {
      headers: this.getHeaders('application/octet-stream'),
      observe: 'response',
      responseType: 'blob' as 'json' // Corrigido: apenas 'blob', sem o 'as json'
    });
  }

  private getHeaders(mediaType: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', mediaType);
    // se nao existir token nao informar
    if (this.state.token) {
      headers = headers.append('Authorization', `Bearer ${this.state.token}`);
    }

    return headers;
  }
}
