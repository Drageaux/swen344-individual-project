import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../classes/user";
import {LastLoginComponent} from "../last-login/last-login.component";

declare var $;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  @ViewChild('lastLogin') lastLogin: LastLoginComponent;
  private loggedIn = false;
  private model: User = JSON.parse(localStorage.getItem('currentUser')) || new User('', '');
  private usersData: User[] = JSON.parse(localStorage.getItem('usersData') || '[]');

  constructor() {
  }

  ngOnInit() {
    this.onSubmit(null);
  }

  onSubmit($event) {
    let findUser = this.usersData.filter((user) =>
      this.model.username === user.username && this.model.password === user.password
    )[0];
    if (findUser) {
      this.loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(this.model));

      $('#login-modal').modal('hide'); // close modal for better UX
    } else {
      if ($event) {
        // don't alert if not an event
        alert('Wrong username or password');
      }
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
