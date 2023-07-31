import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Output() bookWasSelected = new EventEmitter<Book>();
  books:Book[]  = [
    new Book('Living The Vanlife', 'This is simply a test', 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982179618/living-the-vanlife-9781982179618_lg.jpg'),
    new Book('The Last Thing He Told Me', 'This is simply a test', 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501171352/the-last-thing-he-told-me-9781501171352_lg.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onBookSelected(book: Book) {
    this.bookWasSelected.emit(book);
  }
}
