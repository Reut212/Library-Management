import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookDetailes } from '../shared/bookDetailes.model';
import { LibraryListService } from './library-list.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css'],
})
export class LibraryListComponent implements OnInit, OnDestroy {
  bookDetails: BookDetailes[];
  private subscription: Subscription;
  constructor(private libraryListService: LibraryListService) { }

  ngOnInit(): void {
    this.bookDetails = this.libraryListService.getBookDetail();
    this.subscription = this.libraryListService.bookAdded.subscribe(
      (bookDetails: BookDetailes[]) => {
        this.bookDetails = bookDetails;
      }
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
