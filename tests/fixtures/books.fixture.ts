import datasource from '../db-config';
import { BooksEntity } from '../../src/books/entities/Books.entity';

export const booksFixtures = [
  {
    author: 'John Doe',
    ISBN: '0743264738',
    published: new Date(),
  },
  {
    author: 'Albert Einstein',
    ISBN: '0448424967',
    published: new Date(),
  },
] satisfies Omit<BooksEntity, 'id'>[];

export const initializeBooks = async () => {
  const booksEntityRepository = datasource.manager.getRepository(BooksEntity);
  await booksEntityRepository.save(booksFixtures);
};
