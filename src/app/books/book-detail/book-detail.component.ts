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
  id: number;
  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.book = this.bookService.getBook(this.id);
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
    this.bookService.deleteBook(this.id);
    this.router.navigate(['/books']);
  }
}
