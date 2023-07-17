import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BooksDto } from './dtos/Books.dto';
import { BooksService } from './books.service';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('')
  async get(@Res() res: Response<BooksDto[]>) {
    const books = await this.booksService.getBooks();
    return res.status(HttpStatus.OK).json(books);
  }
}
