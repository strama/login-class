import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  authenticate(user: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/auth/login', user, { headers: headers })
    .map(res => res.json());
  }

  registerAccount(user: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/auth/register', user, { headers: headers })
    .map(res => res.json());
  }

  storeData(user: Object, token: string) {
    localStorage.setItem('LOGIN_CLASS_KEY_USER', JSON.stringify(user));
    localStorage.setItem('LOGIN_CLASS_KEY_TOKEN', token);
  }

  loggedIn() {
    return localStorage.getItem('LOGIN_CLASS_KEY_TOKEN') != null;
  }

  logout() {
    localStorage.clear();
  }
}