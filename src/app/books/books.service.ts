import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LibraryListService } from '../library-list/library-list.service';
import { BookDetailes } from '../shared/bookDetailes.model';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BooksService {

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyAMIIrYNFTTSPAyq6lXAugUGcpUXpZjy9Y'

  booksChanged = new EventEmitter<Book[]>(); // EventEmitter to notify about changes

  bookSelected = new Subject<Book>();

  // private books:Book[]  = [
    // new Book(
    //   'Living The Vanlife',
    //   'This is simply a test',
    //   'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982179618/living-the-vanlife-9781982179618_lg.jpg',
    //   [new BookDetailes('Naomi J.Grevemberg', 1990)]),
    // new Book(
    //   'The Last Thing He Told Me',
    //   'This is simply a test',
    //   'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501171352/the-last-thing-he-told-me-9781501171352_lg.jpg',
    //   [new BookDetailes('Laoura Dave', 2020)]),
  // ];
  public books: Book[] = [];

  constructor(private libraryListService: LibraryListService, private http: HttpClient){

  }

  getBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}`;
    return this.http.get(url).pipe(map((response: any) => {
      const items = response.items || [];
      const books = items.map(item => {
        const volumeInfo = item.volumeInfo;
        const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A';
        return {
          id: item.id,
          title: volumeInfo.title || 'N/A',
          authors: authors,
          publisher: volumeInfo.publisher,
          publishedDate: volumeInfo.publishedDate,
          imageLinks: volumeInfo.imageLinks,
          description: volumeInfo.description,
        };
      });
      console.log("Books=", books)
      return books;
    }));
  }

  getBookDetailsFromAPI(bookID: string): Observable<any> {
    const url = `${this.apiUrl}/${bookID}?key=${this.apiKey}`;
    return this.http.get(url).pipe(map((response: any) => {
        const volumeInfo = response.volumeInfo;
        const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A';
        return {
          id: response.id,
          title: volumeInfo.title || 'N/A',
          authors: authors,
          publisher: volumeInfo.publisher,
          publishedDate: volumeInfo.publishedDate,
          imageLinks: volumeInfo.imageLinks,
          description: volumeInfo.description,
        };
      }))
  }

  // getBooks() {
  //   return this.books.slice();
  // }

  getBook(id: number) {
    return this.books[id];
  }

  addBookToLibraryList(bookDetail: BookDetailes[]) {
    this.libraryListService.addBookDetail(bookDetail);
  }

  addBook(newBook: Book) {
    var booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
    if (!booksFromStorage) {
      booksFromStorage = [];
    }
    booksFromStorage.push(newBook);
    localStorage.setItem('booksList', JSON.stringify(booksFromStorage));
    this.books = booksFromStorage;
    console.log(this.books)
    this.books.unshift(newBook);
    this.booksChanged.emit(this.books.slice());
  }

  // getBooksFromStorage() {
  //   var booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
  //   console.log("books from storage: ", booksFromStorage.values);
  //   this.books = booksFromStorage;
  // }

  updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.booksChanged.next(this.books.slice());
  }

  deleteBook(bookID: string) {
    const chosenBook = `${this.apiUrl}/${bookID}?key=${this.apiKey}`;
  }
}
