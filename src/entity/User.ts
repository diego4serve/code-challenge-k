import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail  } from 'class-validator';
import { Scrap } from './Scrap';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail({}, { message: 'El formato de correo electrónico no es válido.' })
  username!: string;

  @Column()
  @Exclude()
  password!: string;

  @OneToMany(() => Scrap, (scrap) => scrap.user)
  scraps!: Scrap[]
}
