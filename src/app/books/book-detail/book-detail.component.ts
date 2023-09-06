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
        this.isLoading = false;
        var currentBook = this.bookService.books.find(book => book.id === bookId);
        if (!!currentBook) {
          this.book = currentBook;
          this.updateBookDetail(this.book);
        }
    });
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
    console.log(this.book.id)
    this.bookService.deleteBook(this.book.id);
    this.router.navigate(['/books']);
  }
}
