import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() item = null;
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
