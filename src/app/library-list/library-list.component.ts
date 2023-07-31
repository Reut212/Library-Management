import { Component, OnInit } from '@angular/core';
import { BookDetailes } from '../shared/author.model';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  bookDetails: BookDetailes[] = [
    new BookDetailes('Ned Blackhawk', 1995),
    new BookDetailes('Ned Blackhawk', 1995)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onBookAdded(bookDetail: BookDetailes) {
    this.bookDetails.push(bookDetail);
  }
}
