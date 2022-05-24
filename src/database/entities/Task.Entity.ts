import { Column, Entity, ManyToOne } from 'typeorm';
import Base from './Base.Entity';
import User from './User.Entity';

@Entity('tasks')
export default class Tasks extends Base {
  @Column('varchar', { length: 50 })
  public title: string;

  @Column('varchar', { length: 100 })
  public description: string;

  @Column('bool')
  public complete: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user_id: User;
}
