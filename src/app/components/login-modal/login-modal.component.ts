import {Component, OnInit} from '@angular/core';
import {User} from "../../classes/user";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  model = new User('', '');
  submitted = false;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true
  }
}
