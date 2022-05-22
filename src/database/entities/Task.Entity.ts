import { Column, Entity } from 'typeorm';
import Base from './Base.Entity';

@Entity('tasks')
export default class Tasks extends Base {
  @Column('varchar', { length: 50 })
  public title: string;

  @Column('varchar', { length: 100 })
  public description: string;

  @Column('bool')
  public complete: boolean;
}
