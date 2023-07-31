import { EventEmitter } from '@angular/core';
import { BookDetailes } from '../shared/bookDetailes.model';

export class LibraryListService {
//MANAGE OUR SHOPPING LIST - ADD INGRIDIENT METHOD
  bookAdded = new EventEmitter<BookDetailes[]>();

  private bookDetails: BookDetailes[] = [
    new BookDetailes('Ned Blackhawk', 1995),
    new BookDetailes('Ned Blackhawk', 1995)
  ];

  getBookDetail() {
    return this.bookDetails.slice();
  }

  addNewBook(bookDetail: BookDetailes) {
    this.bookDetails.push(bookDetail);
    this.bookAdded.emit(this.bookDetails.slice());
  }

  addBookDetail(bookDetails: BookDetailes[]) {
    this.bookDetails.push(...bookDetails);
    this.bookAdded.emit(this.bookDetails.slice())
  }
}
