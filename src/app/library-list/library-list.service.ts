import { EventEmitter } from '@angular/core';
import { BookDetailes } from '../shared/bookDetailes.model';
import { Subject } from 'rxjs-compat/Subject';

export class LibraryListService {
  bookAdded = new Subject<BookDetailes[]>();
  startedEditing = new Subject<number>();

  private bookDetails: BookDetailes[] = [
    new BookDetailes('Ned Blackhawk', '1995'),
    new BookDetailes('Ned Blackhawk', '1995')
  ];

  getBookDetailes(): BookDetailes[] {
    return this.bookDetails.slice();
  }

  getBookDetail(index: number): BookDetailes {
    return this.bookDetails[index];
  }

  addNewBook(bookDetail: BookDetailes): void {
    this.bookDetails.push(bookDetail);
    this.bookAdded.next(this.bookDetails.slice());
  }

  addBookDetail(bookDetails: BookDetailes): void {
    this.bookDetails.push(bookDetails);
    this.bookAdded.next(this.bookDetails.slice())
  }

  updateBookDeatil(index: number, newBookDetail: BookDetailes): void {
    this.bookDetails[index] = newBookDetail;
    this.bookAdded.next(this.bookDetails.slice());
  }

  deleteBookDetail(index: number): void {
    this.bookDetails.splice(index, 1);
    this.bookAdded.next(this.bookDetails.slice())
  }
}
