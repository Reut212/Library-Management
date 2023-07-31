import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
  }

  onAddToLibraryList() {
    this.bookService.addBookToLibraryList(this.book.bookDetail);
  }
}
