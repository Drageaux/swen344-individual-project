import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {NewsItemComponent} from './components/news-item/news-item.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    NewsItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
