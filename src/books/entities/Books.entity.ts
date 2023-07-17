import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Books',
})
export class BooksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  author;

  @Column({ type: 'varchar' })
  ISBN: string;

  @Column({ type: 'timestamptz' })
  published: Date;
}
