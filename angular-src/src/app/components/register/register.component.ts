import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  lastName: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    if (this.password === this.confirmPassword) {
      const user = {
        name: this.name,
        last_name: this.lastName,
        email: this.email,
        password: this.password
      };

      this.authService.registerAccount(user).subscribe(result => {
        console.log(result);
        if (result.success === true) {
          const login = {
            email: user.email,
            password: user.password
          };

          this.authService.authenticate(login).subscribe(loginResult => {
            if (loginResult.success === true) {
              this.authService.storeData(loginResult.user, loginResult.token);
              this.router.navigate(['']);
            }
          });
        } else {
          this.flashMessagesService.show(result.message, { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    } else {
      this.flashMessagesService.show('Password and Confirm Password are not the same', { cssClass: 'alert-danger', timeout: 5000 });
    }
  }

}
