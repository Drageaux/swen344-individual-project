import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {NewsItemComponent} from './components/news-item/news-item.component';
import {FilterPipe} from './pipes/filter.pipe';
import {SortByPipe} from "./pipes/sort-by.pipe";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    NewsItemComponent,
    FilterPipe,
    SortByPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
