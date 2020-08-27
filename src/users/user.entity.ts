import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', name: 'first_name'})
  firstName: string;

  @Column({type: 'text', name: 'last_name'})
  lastName: string;

  @Column({name: 'is_active', default: true})
  isActive: boolean;
}