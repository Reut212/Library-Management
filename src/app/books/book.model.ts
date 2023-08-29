import { BookDetailes } from '../shared/bookDetailes.model';

export class Book {
  constructor(
    public id: string,
    public title: string,
    public authors: string,
    public publisher: string,
    public publishedDate: string,
    public imageLinks: string,
    public description: string,
  ) {}
}
