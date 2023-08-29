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

  booksChanged = new EventEmitter<Book[]>();
  bookSelected = new Subject<Book>();
  public books: Book[] = [];

  constructor(private libraryListService: LibraryListService, private http: HttpClient){}

  getBooks(query: string): Observable<Book[]> {
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
      // console.log("Books=", books)
      return books;
    }));
  }

  getBookDetailsFromAPI(bookID: string): Observable<Book> {
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

  getBook(id: string) : Book {
    if (id.startsWith('manually_added')){
      var booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
      const chosenBook = booksFromStorage.find(book => book.id === id);
      return chosenBook;
    }
    return this.books[id];
  }

  addBook(newBook: Book) {
    var booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
    if (!booksFromStorage) {
      booksFromStorage = [];
    }
    booksFromStorage.push(newBook);
    localStorage.setItem('booksList', JSON.stringify(booksFromStorage));
    console.log(this.books)
    this.books.unshift(newBook);
    this.booksChanged.emit(this.books.slice());
  }

  updateBook(id: string, newBook: Book) {
    if (id.startsWith('manually_added')){
      const booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
      const updatedBooks = booksFromStorage.map((book: Book) => {
        if (book.id === id) {
          return newBook;
        }
        return book;
      });

      localStorage.setItem('booksList', JSON.stringify(updatedBooks));

      const bookIndex = this.books.findIndex(book => book.id === id);
      if (bookIndex !== -1) {
        this.books[bookIndex] = newBook;
        this.booksChanged.emit(this.books.slice());
      }
    }
  }

  deleteBook(bookID: string): void{
    const bookIndex = this.books.findIndex(book => book.id === bookID);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      if (bookID.startsWith('manually_added')){
        this.deleteBookFromLocalStorage(bookID);
      } else {
        this.deleteBookFromBookAPI(bookID);
      }
    }
  }

  deleteBookFromLocalStorage(bookId: string): void {
    var booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
    const chosenBook = booksFromStorage.findIndex(book => book.id === bookId);
    if (chosenBook !== -1) {
      booksFromStorage.splice(chosenBook, 1);
      localStorage.setItem('booksList', JSON.stringify(booksFromStorage));
    }
  }

  deleteBookFromBookAPI(bookId: string): void {
    const apiUrl = `${this.apiUrl}/${bookId}`;
    this.http.delete(apiUrl).subscribe(
      (response) => {
        console.log('Book removed: ', response);
      },
      (error) => {
        console.error('Error removing book: ', error);
      }
    );
  }

  addBookToLibraryList(bookDetail: BookDetailes) {
    this.libraryListService.addBookDetail(bookDetail);
  }
}
