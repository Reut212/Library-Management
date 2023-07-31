import { EventEmitter, Injectable } from '@angular/core';
import { LibraryListService } from '../library-list/library-list.service';
import { BookDetailes } from '../shared/bookDetailes.model';
import { Book } from './book.model';

@Injectable()
export class BooksService {

  bookSelected = new EventEmitter<Book>();

  private books:Book[]  = [
    new Book(
      'Living The Vanlife',
      'This is simply a test',
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982179618/living-the-vanlife-9781982179618_lg.jpg',
      [new BookDetailes('Naomi J.Grevemberg', 1990)]),
    new Book(
      'The Last Thing He Told Me',
      'This is simply a test',
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501171352/the-last-thing-he-told-me-9781501171352_lg.jpg',
      [new BookDetailes('Laoura Dave', 2020)]),
  ];

  constructor(private libraryListService: LibraryListService){

  }

  getBooks() {
    return this.books.slice();
  }

  addBookToLibraryList(bookDetail: BookDetailes[]) {
    this.libraryListService.addBookDetail(bookDetail);
  }
}
