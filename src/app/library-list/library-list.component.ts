import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookDetailes } from '../shared/bookDetailes.model';
import { LibraryListService } from './library-list.service';
import { Subscription } from 'rxjs-compat';

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
    this.bookDetails = this.libraryListService.getBookDetailes();
    this.subscription = this.libraryListService.bookAdded.subscribe(
      (bookDetails: BookDetailes[]) => {
        this.bookDetails = bookDetails;
      }
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.libraryListService.startedEditing.next(index);
  }
}
