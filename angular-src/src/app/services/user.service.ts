import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  fetchUsers() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('/api/users/user', { headers: headers })
    .map(res => res.json());
  }

  getSingleUser(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('/api/users/user/' + id, { headers: headers })
    .map(res => res.json());
  }

  updateUser(user: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/users/user', user, { headers: headers })
    .map(res => res.json());
  }

  deleteUser(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('/api/users/user/' + id, { headers: headers })
    .map(res => res.json());
  }

}
