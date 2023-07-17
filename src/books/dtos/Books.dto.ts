import { BooksEntity } from '../entities/Books.entity';
import { IsDate, IsISBN, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BooksDto implements BooksEntity {
  @ApiProperty({ type: Number })
  @IsNumber()
  id: number;

  @ApiProperty({ type: String })
  @IsString()
  author: string;

  @ApiProperty({ type: String })
  @IsISBN()
  ISBN: string;

  @ApiProperty({ type: Date })
  @IsDate()
  published: Date;
}
