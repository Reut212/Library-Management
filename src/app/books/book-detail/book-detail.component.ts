import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books:any[] = [];
  book: Book;
  bookId: string;
  isLoading: boolean = true;
  ableToFetch: boolean = false;
  booksFromStorage: Book[] = JSON.parse(localStorage.getItem('booksList'));

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
          console.log("Updated book:", this.book);
        }
      }
    );
  }

  fetchBookDetailsFromAPI(bookId: string): void {
    this.bookService.getBookDetailsFromAPI(bookId).subscribe(
      (data: any) => {
        this.book = data;
        console.log(this.book)
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  // onAddToLibraryList() {
  //   this.bookService.addBookToLibraryList(this.book.bookDetailes);
  // }

  onEditBook() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteBook() {
    this.bookService.deleteBook(this.book.id);
    this.router.navigate(['/books']);
  }
}
