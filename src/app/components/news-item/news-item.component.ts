import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() item = null;
  @Input() favorited = false;
  @Output() onFavorited = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  onFavorite(favorited: any){
    this.onFavorited.emit(favorited);
    this.favorited = favorited;
  }
}
