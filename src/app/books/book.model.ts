import { BookDetailes } from '../shared/bookDetailes.model';

// export class Book {
//   constructor(
//   public title: string,
//   public description: string,
//   public authors: string,
//   public publisher: string,
//   public catalogNumber: string,
//   public publishedDate: string,
//   public imageLinks: { thumbnail: ''},
//   public bookDetailes: BookDetailes[]
//   ) {}
// }
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

export interface BookModel{
  title: string,
  publisher: string,
  publishedDate: string,
  imageLinks: string,
  description: string,
  authors:string;
}
