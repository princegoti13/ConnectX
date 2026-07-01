import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private api = 'http://localhost:5000/api/auth';

  login(data: any): Observable<any> {
    return this.http.post(
      `${this.api}/login`,

      data,

      {
        withCredentials: true,
      },
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.api}/register`,

      data,
    );
  }

  me(): Observable<any> {
    return this.http.get(
      `${this.api}/me`,

      {
        withCredentials: true,
      },
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.api}/logout`,

      {},

      {
        withCredentials: true,
      },
    );
  }
}
