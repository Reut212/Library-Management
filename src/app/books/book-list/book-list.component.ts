import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { BooksService } from '../books.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit, OnDestroy {
  books:any[] = [];
  subscription: Subscription;
  searchQuery: string = '';
  sortOption: string = 'authors';
  sortedBooks: any[] = [];


  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchQuery.trim() !== '') {
      this.bookService.getBooks(this.searchQuery).subscribe((data) => {
        this.books = data.items;
        this.filterBooks();
      });
    } else {
      // Show all books when the search bar is empty
      this.fetchAllBooks();
    }
  }

  fetchAllBooks(): void {
    // Use a default search query to fetch a wide range of books
    const defaultQuery = 'a'; // A query that matches many books
    this.bookService.getBooks(defaultQuery).subscribe((data) => {
      this.books = data.items;
      this.filterAndSortBooks();
    });
  }

  filterAndSortBooks(): void {
    // Filter and sort books based on criteria
    const filteredBooks = this.books.filter((book) => {
      const hasPublicationYear = book.volumeInfo.publishedDate;
      const hasAuthor = book.volumeInfo.authors && book.volumeInfo.authors.length > 0;
      const hasCatalogNumber = book.id;
      return hasPublicationYear && hasAuthor && hasCatalogNumber;
    });

    this.sortedBooks = this.sortBooks(filteredBooks);
  }

  filterBooks(): void {
    this.sortedBooks = this.books.filter((book) => {
      const hasPublicationYear = book.volumeInfo.publishedDate;
      const hasAuthor = book.volumeInfo.authors && book.volumeInfo.authors.length > 0;
      const hasCatalogNumber = book.id;
      return hasPublicationYear && hasAuthor && hasCatalogNumber;
    });
  }

  sortBooks(books: any[]): any[] {
    return books.sort((a, b) => {
      if (this.sortOption === 'author') {
        const authorsA = a.volumeInfo.authors ? a.volumeInfo.authors.join(', ') : '';
        const authorsB = b.volumeInfo.authors ? b.volumeInfo.authors.join(', ') : '';
        return authorsA.localeCompare(authorsB);
      } else if (this.sortOption === 'publishedDate') {
        const dateA = new Date(a.volumeInfo.publishedDate).getTime();
        const dateB = new Date(b.volumeInfo.publishedDate).getTime();
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
    this.subscription.unsubscribe();
  }

  onNewBook() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
