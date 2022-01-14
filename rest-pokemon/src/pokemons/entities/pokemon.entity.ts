import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pokemon' })
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  weight: number;
}
