import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuarios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UsuarioPayload {
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://172.25.142.14:8080/api/v1/usuarios/';
  
  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    console.log(this.http.get<Usuario[]>(this.apiUrl));
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: UsuarioPayload): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    
    console.log(`Enviando petición DELETE a: ${url}`);
    
    return this.http.delete(url);
  }
}
