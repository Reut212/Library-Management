import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit, OnDestroy {
  books:Book[] = [];
  private booksChangedSub: Subscription;
  subscription: Subscription;
  searchQuery: string = '';
  sortOption: string = 'authors';
  sortedBooks: Book[] = [];


  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.booksChangedSub = this.bookService.booksChanged.subscribe(
        (updatedBooks: Book[]) => {
          console.log('updatedBooks', updatedBooks);
          this.books = updatedBooks.concat(this.books);
          console.log('this.books', this.books)
          this.filterAndSortBooks();
        }
      );
      this.fetchAllBooks();
    }

  fetchAllBooks(): void {
    const defaultQuery = 'a';
    this.bookService.getBooks(defaultQuery).subscribe((data) => {
      this.books = data;
      console.log("this.books",this.books)
      this.filterAndSortBooks();
    });
  }

  filterAndSortBooks(): void {
    const filteredBooks = this.books.filter((book) => {
      // const hasVolumeInfo = book.volumeInfo && typeof book.volumeInfo === 'object';
      const hasPublicationYear = book.publishedDate;
      const hasAuthor = book.authors && book.authors.length > 0;
      const hasCatalogNumber = book.id;
      return hasPublicationYear && hasAuthor && hasCatalogNumber;
    });
    this.sortedBooks = this.sortBooks(filteredBooks);
  }

  sortBooks(books: any[]): any[] {
    console.log('Sorting option:', this.sortOption);

    return books.sort((a, b) => {
      if (this.sortOption === 'author') {
        const authorsA = a.authors;
        const authorsB = b.authors;
        return authorsA.localeCompare(authorsB)
      } else if (this.sortOption === 'publishedDate') {
        const dateA = new Date(a.publishedDate).getTime();
        const dateB = new Date(b.publishedDate).getTime();
        return dateA - dateB;
      } else if (this.sortOption === 'catalogNumber') {
        return a.id.localeCompare(b.id);
      }
      return 0;
    });
  }

  onSortOptionChange(): void {
    this.sortedBooks = this.sortBooks(this.sortedBooks);
  }

  ngOnDestroy(): void {
    this.booksChangedSub.unsubscribe();
  }

  onNewBook() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onBookClick(book: any): void {
    this.router.navigate([book], {relativeTo: this.route});
  }

  searchBooks(): void {
    if (this.searchQuery.trim() !== '') {
      this.bookService.getBooks(this.searchQuery).subscribe((data) => {
        // this.books = data.items;
        this.filterBooks();
      });
    } else {
      // Show all books when the search bar is empty
      this.fetchAllBooks();
    }
  }

  filterBooks(): void {
    this.sortedBooks = this.books.filter((book) => {
      const hasPublicationYear = book.publishedDate;
      const hasAuthor = book.authors && book.authors.length > 0;
      const hasCatalogNumber = book.id;
      return hasPublicationYear && hasAuthor && hasCatalogNumber;
    });
  }
}
