import { Column, Entity } from 'typeorm';
import Base from './Base.Entity';

@Entity('users')
export default class User extends Base {
  @Column('varchar', { length: 100 })
  public name: string;

  @Column('varchar', { length: 255 })
  public email: string;

  @Column('varchar', { length: 255 })
  public password: string;
}
