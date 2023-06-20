import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Link } from './Link';
import { IsIn, IsUrl } from 'class-validator'
import { User } from './User';
import { ScrapStatus } from '../constants/scrap.constants';
import { Transform } from 'class-transformer';

@Entity()
export class Scrap {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({nullable: false})
  @IsUrl({}, { message: 'URL no valida'})
  url!: string;

  @Column({nullable: false})
  @IsIn(Object.values(ScrapStatus))
  status!: string

  @OneToMany(() => Link, (link) => link.scrap, { eager: true})
  links!: Link[]

  @ManyToOne(() => User, (user) => user.scraps, { nullable: false})
  @Transform(({value}) => ({ id: value.id, username: value.username }))
  user!: User
}
