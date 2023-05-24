import { User } from './../model/User';
import { Component, OnInit, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) {

  }

  ngOnInit() {
    this.userService.getAllUsers();
  }

  CreateUser(user: User) {
    console.log(user);
    this.userService.createUsers(user).subscribe((resp: User) => {
      user = resp
      user = new User
    });

  }

}
