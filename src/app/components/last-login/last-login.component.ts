import {Component, OnInit, Input} from '@angular/core';

declare var dateFormat;

@Component({
  selector: 'app-last-login',
  templateUrl: './last-login.component.html',
  styleUrls: ['./last-login.component.css']
})
export class LastLoginComponent implements OnInit {

  @Input() username = '';
  private lastVisit = '';

  constructor() {
  }

  ngOnInit() {
    this.lastVisit = this.getCookie('lastVisit');
    this.setCookie('username', this.username);
  }

  setCookie(cname, cvalue) {
    let d = new Date();
    let lastVisit = 'lastVisit=' + dateFormat(d, 'mm-dd-yyyy HH:mm:ss');
    document.cookie = cname + '=' + cvalue + ';';
    document.cookie = lastVisit;
    document.cookie = ';path=/';
  }

  getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
