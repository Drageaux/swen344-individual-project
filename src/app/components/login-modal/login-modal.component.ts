import {Component, OnInit} from '@angular/core';
import {User} from "../../classes/user";

declare var $;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loggedIn = false;
  private model: User = JSON.parse(localStorage.getItem('currentUser')) || new User('', '');
  private usersData: User[] = JSON.parse(localStorage.getItem('usersData') || '[]');

  constructor() {
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    let findUser = this.usersData.filter((user) =>
      this.model.username === user.username && this.model.password === user.password
    )[0];
    if (findUser) {
      this.loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(this.model));

      $('#login-modal').modal('hide'); // close modal for better UX
    }
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.model = new User('', '');
    this.loggedIn = false;
  }

  onSignUpSuccess($event: User) {
    this.model = $event;
    this.loggedIn = true;
  }
}
