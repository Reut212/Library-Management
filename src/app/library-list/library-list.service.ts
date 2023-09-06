import { EventEmitter } from '@angular/core';
import { BookDetailes } from '../shared/bookDetailes.model';
import { Subject } from 'rxjs-compat/Subject';

export class LibraryListService {
  bookAdded = new Subject<BookDetailes[]>();
  startedEditing = new Subject<number>();
  bookAddedToFav = new EventEmitter<boolean>();
  bookAddedToFavStream = this.bookAddedToFav.asObservable();

  private bookDetails: BookDetailes[] = [];

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
    const bookIsFound = this.bookDetails.some(bookDetail => bookDetail.name === bookDetails.name && bookDetail.authors === bookDetails.authors);
    if(!bookIsFound){
    this.bookDetails.push(bookDetails);
    this.bookAdded.next(this.bookDetails.slice())
    this.bookAddedToFav.emit(true);}
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
