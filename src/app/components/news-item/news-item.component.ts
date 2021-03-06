import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NewsItem} from "../../classes/news-item";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() item: NewsItem = null;
  @Input() favoritesOnly: boolean = false;
  @Output() onFavorited = new EventEmitter<{guid: string, favorited: boolean}>();

  constructor() {
  }

  ngOnInit() {
  }

  onFavorite(guid: string, favorited: boolean) {
    this.onFavorited.emit({
      guid: guid,
      favorited: favorited
    });
    this.item.favorited = favorited;
  }
}
