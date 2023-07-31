import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../book.model';
import { BooksService } from '../../books.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.bookService.bookSelected.emit(this.book);
  }
}
