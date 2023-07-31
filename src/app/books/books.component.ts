import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService]
})
export class BooksComponent implements OnInit {
  selectedBook: Book;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.bookSelected
    .subscribe(
      (book: Book) => {
        this.selectedBook = book;
      })
    ;
  }

}
