import { BookDetailes } from '../shared/bookDetailes.model';

export class Book {
  public name: string;
  public description: string;
  public imagePath: string;
  public bookDetailes: BookDetailes[];

  constructor(name: string, desc: string, imagePath: string, bookDetail: BookDetailes[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.bookDetailes = bookDetail;
  }
}
