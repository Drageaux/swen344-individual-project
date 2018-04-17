import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from "@angular/common/http";
import {forkJoin} from "rxjs/observable/forkJoin";

import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry, map} from 'rxjs/operators';
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
  private sportsList: string[] = ['NFL', 'NHL', 'MLB'];
  private newsItems: any[] = [];

  private filterOuts = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // compiling a list of HTTP calls from all types of listed sports
    let rssCalls = [];
    this.sportsList.forEach((sport) => {
      rssCalls.push(this.getRss(sport));
    });

    // one single place for sending all requests
    forkJoin(rssCalls)
      .subscribe(res => {
        // wrap as a list of RSS responses in JSON form
        let rssResults = res as RssJson[];
        rssResults.forEach((rss) => {
          rss.items.forEach((item) => {
            item.sport = rss.sport;
            this.newsItems.push(item);
          });
        });

        console.log(this.newsItems)
      });
  }

  toggleFilter(sport: string) {
    let index = this.filterOuts.indexOf(sport);
    if (index === -1){
      this.filterOuts.push(sport);
    } else {
      this.filterOuts.splice(index, 1);
    }
    console.log(this.filterOuts);
  }

  /****************
   * WEB REQUESTS *
   ****************/
  getRss(sportFeed): Observable<RssJson> {
    return this.http.get<RssJson>(this.rssToJsonServiceBaseUrl
      + 'http://www.espn.com/espn/rss/' + sportFeed + '/news')
      .pipe(
        map(res => {
          let result = res as RssJson;
          result.sport = sportFeed;
          return result;
        }),
        catchError(this.handleError));
  }

  /*****************
   * ERROR HANDLER *
   *****************/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
