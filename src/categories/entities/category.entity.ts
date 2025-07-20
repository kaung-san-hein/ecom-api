import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
