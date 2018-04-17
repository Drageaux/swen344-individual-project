import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {map} from 'rxjs/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RssJson} from './classes/rss-json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
  private rssJson: RssJson = null;
  newsItems: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getRss()
      .subscribe(res => {
          this.rssJson = res ;
          if (this.rssJson){
            console.log(this.rssJson.items)
          }
        }
      )
  }

  /****************
   * WEB REQUESTS *
   ****************/
  getRss(): Observable<RssJson> {
    return this.http.get<RssJson>(this.rssToJsonServiceBaseUrl
      + 'http://www.espn.com/espn/rss/NHL/news')
  }
}
