import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from "../../classes/user";

declare var $;

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  // @Output() onSignUpSuccess = new EventEmitter<UsernamePassword>();
  model: User = new User('', '');
  submitted = false;
  private usersData: User[] = JSON.parse(localStorage.getItem('usersData') || '[]');

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    let existingUser = this.usersData.filter((user) => user.username == this.model.username)[0];
    if (existingUser) {
      // handle duplicate user
      alert('Username already exists');
    } else {
      // create new user
      if (this.model.password) {
        this.usersData.push(this.model);
        localStorage.setItem('usersData', JSON.stringify(this.usersData));
        $('#signup-modal').modal('hide')
      }
    }
  }
}
