import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

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
    const newBook = new Book(
      this.bookForm.value['name'],
      this.bookForm.value['description'],
      this.bookForm.value['authors'],
      this.bookForm.value['imagePath'],
      this.bookForm.value['bookDetailes']
    );
    if (this.editMode) {
      this.bookService.updateBook(this.id, newBook);
    } else {
      this.bookService.addBook(newBook);
    }
    this.onCancel();
  }

  private initForm() {
    let bookName = '';
    let imageLinks: {
      thumbnail: string;
    };
    let bookDescription = '';
    let bookDetailes = new FormArray([]);

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      bookName = book.title;
      imageLinks = book.imageLinks;
      bookDescription = book.description;
      if (book['bookDetailes']) {
        for (let bookDetail of book.bookDetailes) {
          bookDetailes.push(
            new FormGroup({
              'name': new FormControl(bookDetail.name, Validators.required),
              'yearOfPublish': new FormControl(bookDetail.yearOfPublish, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.bookForm = new FormGroup({
      'name': new FormControl(bookName, Validators.required),
      'imagePath': new FormControl(imageLinks, Validators.required),
      'description': new FormControl(bookDescription, Validators.required),
      'bookDetailes': bookDetailes
    });
  }

  get controls() { // a getter!
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
