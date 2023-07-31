import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  selectedBook: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
