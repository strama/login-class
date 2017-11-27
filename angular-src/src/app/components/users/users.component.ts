import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<any>;

  constructor(
    private router: Router,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userService.fetchUsers().subscribe(result => {
      if (result.success === true) {
        this.users = result.user;
      } else {
        this.flashMessagesService.show('Error while fetching all users', { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

}
