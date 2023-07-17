import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { booksFixtures } from '../../tests/fixtures/books.fixture';

describe(BooksController, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /books', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);

    expect(
      response.body.map(({ author, ISBN, published }) => ({
        author,
        ISBN,
        published: new Date(published).toDateString(),
      })),
    ).toStrictEqual(
      booksFixtures.map(({ published, ...rest }) => ({
        ...rest,
        published: new Date(published).toDateString(),
      })),
    );
  });

  afterAll(() => {
    app.close();
  });
});
