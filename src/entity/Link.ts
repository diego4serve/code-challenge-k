import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Scrap } from './Scrap';
import { IsUrl } from 'class-validator';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  @IsUrl()
  url!: string;

  @ManyToOne(() => Scrap, (scrap) => scrap.links)
  scrap!: Scrap
}
