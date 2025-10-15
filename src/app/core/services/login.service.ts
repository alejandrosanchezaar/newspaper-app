import { Injectable } from '@angular/core';
import { User } from '@/core/models/user';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User | null = null;
  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';
  private httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) {
    // intentar mantener sesión al arrancar
    this.stayLoggedIn();
  }

  /** True si hay usuario activo */
  isLogged(): boolean {
    return this.user != null;
  }

  /** Petición real de login al backend */
  login(name: string, pwd: string, remember: boolean = false): Observable<User> {
    const body = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);

    return this.http.post<User>(this.loginUrl, body, this.httpOptions).pipe(
      tap(user => {
        this.user = user;

        // Guardar datos si se marcó "remember me"
        if (remember) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  /** Devuelve el usuario actual */
  getUser(): User | null {
    return this.user;
  }

  /** Cerrar sesión */
  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  /** Restaura la sesión previa si existía */
  stayLoggedIn(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data) as User;
    }
  }

  /** Recupera valores clave del modelo */
  getAuthData(): { idUser: string; apiKey: string; restAUTH: string } | null {
    if (!this.user) return null;
    const { idUser, apiKey, restAUTH } = this.user as any;
    return { idUser, apiKey, restAUTH };
  }
}

