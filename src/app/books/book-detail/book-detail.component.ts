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
  book: Book;
  bookId: string;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.fetchBookDetails(this.bookId);
    });
  }

  fetchBookDetails(bookId: string): void {
    // Use the book service to fetch detailed book information
    this.bookService.getBookDetails(bookId).subscribe((data) => {
      this.book = data; // Store the book details in the 'book' property
    });
  }

  onAddToLibraryList() {
    this.bookService.addBookToLibraryList(this.book.bookDetailes);
  }

  onEditBook() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteBook() {
    this.bookService.deleteBook(this.bookId);
    this.router.navigate(['/books']);
  }
}
