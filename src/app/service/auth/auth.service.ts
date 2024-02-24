import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../../interface/user-interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment;

  constructor(private http: HttpClient) {}

  getAuthUrl() {
    window.open(this.authUrl + '/oauth2/authorization/google', '_self');
  }

  validateEmail(email: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.authUrl}/user/${email}`);
  }
}
