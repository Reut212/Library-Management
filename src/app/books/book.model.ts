import { BookDetailes } from '../shared/bookDetailes.model';

export class Book {
  constructor(
  public title: string,
  public description: string,
  public authors: [],
  public imageLinks: { thumbnail: ''},
  public bookDetailes: BookDetailes[]
  ) {}
}
