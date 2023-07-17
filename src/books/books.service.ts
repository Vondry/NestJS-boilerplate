import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksEntity } from './entities/Books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksEntityRepository: Repository<BooksEntity>,
  ) {}

  async getBooks() {
    return this.booksEntityRepository.find();
  }
}
