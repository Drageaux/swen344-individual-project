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
  newsItems: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    let nflRss = this.getRss('NFL');
    let nhlRss = this.getRss('NHL');
    let mlbRss = this.getRss('MLB');

    forkJoin([nflRss, nhlRss, mlbRss])
      .subscribe(res => {
        let rssResults = res as RssJson[];
        rssResults.forEach((rss) => {
          rss.items.forEach((item) => {
            item.sport = rss.sport;
            this.newsItems.push(item);
          });
        });

        console.log(this.newsItems)
      });

    // this.getRss()
    //
    //   .subscribe(res => {
    //       this.rssJson = res ;
    //       if (this.rssJson){
    //         console.log(this.rssJson.items)
    //       }
    //     }
    //   )
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
