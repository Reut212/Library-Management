import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookDetailes } from 'src/app/shared/bookDetailes.model';
import { LibraryListService } from '../library-list.service';

@Component({
  selector: 'app-library-edit',
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.css']
})
export class LibraryEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('yearInput') yearInputRef: ElementRef;

  constructor(private libraryListService: LibraryListService) { }

  ngOnInit(): void {
  }

  onAddItem() {
    const bookName = this.nameInputRef.nativeElement.value;
    const bookYear = this.yearInputRef.nativeElement.value;
    const newBookDetail = new BookDetailes(bookName, bookYear);
    this.libraryListService.addNewBook(newBookDetail);
  }
}
