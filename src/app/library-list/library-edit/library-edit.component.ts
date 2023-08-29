import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookDetailes } from 'src/app/shared/bookDetailes.model';
import { LibraryListService } from '../library-list.service';

@Component({
  selector: 'app-library-edit',
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.css']
})
export class LibraryEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) libraryListForm: NgForm;
  subscription: Subscription;
  editMode=false;
  editedItemIndex: number;
  editedItem: BookDetailes;

  constructor(private libraryListService: LibraryListService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }


  ngOnInit(): void {
    this.subscription = this.libraryListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.libraryListService.getBookDetail(index);
        this.libraryListForm.setValue({
          name: this.editedItem.name,
          authors: this.editedItem.authors
        })
      }
    );

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBookDetail = new BookDetailes(value.name, value.authors);
    if (this.editMode) {
      this.libraryListService.updateBookDeatil(this.editedItemIndex, newBookDetail);
      this.editMode = false;
    } else {
    this.libraryListService.addNewBook(newBookDetail);
    }
    form.reset();
  }

  onClear() {
    this.libraryListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.libraryListService.deleteBookDetail(this.editedItemIndex);
  }
}
