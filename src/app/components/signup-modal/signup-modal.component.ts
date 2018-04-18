import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from "../../classes/user";

declare var $;

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  @Output() onSignUpSuccess = new EventEmitter<User>();
  private model: User = new User('', '');
  private usersData: User[] = JSON.parse(localStorage.getItem('usersData') || '[]');

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    let existingUser = this.usersData.filter((user) => user.username == this.model.username)[0];
    if (existingUser) {
      // handle duplicate user
      alert('Username already exists');
    } else {
      // create new user
      if (this.model.password) {
        this.usersData.push(this.model);
        localStorage.setItem('usersData', JSON.stringify(this.usersData));

        $('#signup-modal').modal('hide'); // close modal for better UX
        this.onSignUpSuccess.emit(this.model);
      }
    }
  }
}
