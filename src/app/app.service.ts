import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professional } from './interfaces/professional';
import { Publication } from './interfaces/publication';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  cadastrarProfessional(professional: Professional): Observable<Professional> {
    const url = `${environment.dssmApiUrl}/signUp`;
    return this.http.post<Professional>(url,professional);
  }

  cadastrarPublication(publication: Publication): Observable<Publication> {
    const url = `${environment.dssmApiUrl}/publicate`;
    return this.http.post<Publication>(url,publication);
  }

  listrarPostagens(userId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/retrievePublicationList/${userId}`;
    return this.http.get<Publication>(url);
  }

  retornarDadosUsuario(userId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/retrieveProfessionalData/${userId}`;
    return this.http.get<Professional>(url);
  }

  searchbar(searchitem): Observable<any>{
    const url = `${environment.dssmApiUrl}/search`;
    return this.http.post(url,searchitem);
  }
}

