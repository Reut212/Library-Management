import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BookDetailes } from 'src/app/shared/author.model';

@Component({
  selector: 'app-library-edit',
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.css']
})
export class LibraryEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('yearInput') yearInputRef: ElementRef;
  @Output() bookAdded = new EventEmitter<BookDetailes>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem() {
    const bookName = this.nameInputRef.nativeElement.value;
    const bookYear = this.yearInputRef.nativeElement.value;
    const newBookDetail = new BookDetailes(bookName, bookYear);
    this.bookAdded.emit(newBookDetail);
  }
}
