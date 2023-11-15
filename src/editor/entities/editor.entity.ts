import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Editor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  contents: string;
}
