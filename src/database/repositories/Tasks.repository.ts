import { EntityRepository, Repository } from 'typeorm';
import Tasks from '../entities/Task.Entity';

@EntityRepository(Tasks)
export default class TasksRepository extends Repository<Tasks> {}
