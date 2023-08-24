import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { BookDetailes } from 'src/app/shared/bookDetailes.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  id: number;
  editMode = false;
  bookForm: FormGroup;
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    console.log('raw',this.bookForm.getRawValue());
    const uniqueId = 'manually_added_' + Date.now().toString();
    const newBook = new Book(
      uniqueId,
      this.bookForm.value['name'],
      this.bookForm.value['authors'],
      this.bookForm.value['publisher'],
      this.bookForm.value['publishedDate'],
      this.bookForm.value['imagePath'],
      this.bookForm.value['description']
    );
    console.log('value',this.bookForm.value)
    // const newBook = new Book(
    //   uniqueId
    //   ...this.bookForm.value
    // );
    if (this.editMode) {
      this.bookService.updateBook(this.id, newBook);
    } else {
      this.bookService.addBook(newBook);
    }
    this.onCancel();
  }

  private initForm() {
    let bookName = '';
    let imageLinks: string;
    let authors: string;
    let publisher: string;
    let catalogNumber: string;
    let publishedDate: string;
    let bookDescription = '';
    // let bookDetailes = new FormArray([]);

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      bookName = book.title;
      imageLinks = book.imageLinks;
      authors = book.authors;
      publisher = book.publisher || '';;
      catalogNumber = book.id || '';;
      publishedDate = book.publishedDate || '';;
      bookDescription = book.description;
      // if (book['bookDetailes']) {
      //   for (let bookDetail of book.bookDetailes) {
      //     bookDetailes.push(
      //       new FormGroup({
      //         'name': new FormControl(bookDetail.name, Validators.required),
      //         'yearOfPublish': new FormControl(bookDetail.yearOfPublish, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
    }
    this.bookForm = new FormGroup({
      'name': new FormControl(bookName, Validators.required),
      'authors': new FormControl(authors, Validators.required),
      'publisher': new FormControl(publisher, Validators.required),
      'catalogNumber': new FormControl(catalogNumber, Validators.required),
      'publishedDate': new FormControl(publishedDate, Validators.required),
      'imagePath': new FormControl(imageLinks, Validators.required),
      'description': new FormControl(bookDescription, Validators.required),
      // 'bookDetailes': bookDetailes
    });
  }

  get controls() {
    return (<FormArray>this.bookForm.get('bookDetailes')).controls;
  }

  onAddBookDetail() {
    (<FormArray>this.bookForm.get('bookDetailes')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'yearOfPublish': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteBookDetail(index: number) {
    (<FormArray>this.bookForm.get('bookDetailes')).removeAt(index);
  }
}
