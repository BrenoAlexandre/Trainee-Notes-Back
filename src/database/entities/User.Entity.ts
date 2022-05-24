import { Column, Entity, OneToMany } from 'typeorm';
import Base from './Base.Entity';
import Tasks from './Task.Entity';

@Entity('users')
export default class User extends Base {
  @Column('varchar', { length: 100 })
  public name: string;

  @Column('varchar', { length: 255 })
  public email: string;

  @Column('varchar', { length: 255 })
  public password: string;

  @OneToMany(() => Tasks, (task) => task.user_id)
  tasks: Tasks[];
}
