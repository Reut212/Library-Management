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
  book: Book = {
    title: '',
    description: '',
    authors: [],
    imageLinks: {
      thumbnail: ''
    },
    bookDetailes: []
  };
  bookId: string;
  isLoading: boolean = true;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      this.fetchBookDetails(bookId);
    });
  }

  fetchBookDetails(bookId: string): void {
    this.bookService.getBookDetailsFromAPI(bookId).subscribe(
      (data: any) => {
        this.book = data.volumeInfo;
        this.isLoading = false; // Set isLoading to false when data is available
      },
      (error) => {
        console.error(error);
        this.isLoading = false; // Set isLoading to false even if there's an error
      }
    );
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
