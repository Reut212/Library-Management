import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books:Book[];
  subscription: Subscription;

  private API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.bookService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    )
    this.books = this.bookService.getBooks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewBook() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
