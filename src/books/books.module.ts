import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from './entities/Books.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
