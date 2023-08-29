import { EventEmitter } from '@angular/core';
import { BookDetailes } from '../shared/bookDetailes.model';
import { Subject } from 'rxjs';

export class LibraryListService {
  bookAdded = new Subject<BookDetailes[]>();
  startedEditing = new Subject<number>();

  private bookDetails: BookDetailes[] = [
    new BookDetailes('Ned Blackhawk', '1995'),
    new BookDetailes('Ned Blackhawk', '1995')
  ];

  getBookDetailes() {
    return this.bookDetails.slice();
  }

  getBookDetail(index: number) {
    return this.bookDetails[index];
  }

  addNewBook(bookDetail: BookDetailes) {
    this.bookDetails.push(bookDetail);
    this.bookAdded.next(this.bookDetails.slice());
  }

  addBookDetail(bookDetails: BookDetailes) {
    this.bookDetails.push(bookDetails);
    this.bookAdded.next(this.bookDetails.slice())
  }

  updateBookDeatil(index: number, newBookDetail: BookDetailes) {
    this.bookDetails[index] = newBookDetail;
    this.bookAdded.next(this.bookDetails.slice());
  }

  deleteBookDetail(index: number) {
    this.bookDetails.splice(index, 1);
    this.bookAdded.next(this.bookDetails.slice())
  }
}
