import { Component, OnInit } from '@angular/core';
import { BookDetailes } from '../shared/bookDetailes.model';
import { LibraryListService } from './library-list.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css'],
})
export class LibraryListComponent implements OnInit {
  bookDetails: BookDetailes[];
  constructor(private libraryListService: LibraryListService) { }

  ngOnInit(): void {
    this.bookDetails = this.libraryListService.getBookDetail();
    this.libraryListService.bookAdded.subscribe(
      (bookDetails: BookDetailes[]) => {
        this.bookDetails = bookDetails;
      }
    )
  }
}
