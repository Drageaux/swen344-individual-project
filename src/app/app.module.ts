import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {NewsItemComponent} from './components/news-item/news-item.component';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import {FilterPipe} from './pipes/filter.pipe';
import {SortByPipe} from "./pipes/sort-by.pipe";
import {AuthService} from "./services/auth.service";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NewsItemComponent,
    FilterPipe,
    SortByPipe,
    LoginModalComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
