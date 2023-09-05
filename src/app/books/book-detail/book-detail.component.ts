import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { BookDetailes } from 'src/app/shared/bookDetailes.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {
  books:Book[] = [];
  book: Book;
  bookId: string;
  isLoading: boolean = true;
  ableToFetch: boolean = false;
  booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));
  bookDetail: BookDetailes;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.registerToBookAddStream();
    this.registerToRouteChangesStream();
  }

  registerToRouteChangesStream(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if(bookId.startsWith('manually_added')){
        this.isLoading = false;
        var currentBook = this.bookService.books.find(book => book.id === bookId);
        if (!!currentBook) {
          this.book = currentBook;
          this.updateBookDetail(this.book);
        }
      } else {
      this.fetchBookDetailsFromAPI(bookId);
    }});
  }

  registerToBookAddStream(): void {
    this.bookService.booksChanged.subscribe(
      (updatedBooks: Book[]) => {
        if (updatedBooks.length > 0) {
          this.isLoading = false;
          this.book = updatedBooks[0];
        }
      }
    );
  }

  fetchBookDetailsFromAPI(bookId: string): void {
    this.bookService.getBookDetailsFromAPI(bookId).subscribe(
      (data: Book) => {
        this.book = data;
        this.updateBookDetail(this.book);
        console.log(this.book)
        this.isLoading = false;},
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  updateBookDetail(book: Book): void {
    this.bookDetail = new BookDetailes(book.title, book.authors);
  }
  onAddToLibraryList(): void {
    this.bookService.addBookToLibraryList(this.bookDetail);
  }

  onEditBook(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteBook(): void {
    this.bookService.deleteBook(this.book.id);
    this.router.navigate(['/books']);
  }
}
