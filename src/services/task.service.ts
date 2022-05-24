import { Equal, getCustomRepository, Not } from 'typeorm';
import TasksRepository from '../database/repositories/tasks.repository';
import Tasks from '../database/entities/Task.Entity';
import ApiError from '../utils/apiError.utils';

export async function createTask(task: {
  title: string;
  description: string;
  complete: boolean;
}): Promise<Tasks> {
  const { title, description, complete } = task;

  const repository = getCustomRepository(TasksRepository);
  const titleExists = await repository.findOne({ where: { title } });

  if (titleExists) {
    throw new ApiError(400, false, 'Já existe uma tarefa com este título');
  }

  const newTask = repository.create({ title, description, complete });
  await repository.save(newTask);
  return newTask;
}

///

export async function findAllTasks(): Promise<Tasks[]> {
  const repository = getCustomRepository(TasksRepository);
  const tasks = await repository.find({ order: { created_at: 'ASC' } });

  return tasks;
}

///

export async function findTasksById(id: string): Promise<Tasks[]> {
  const repository = getCustomRepository(TasksRepository);
  const tasks = await repository.find({
    where: { user_id: id },
    order: { created_at: 'ASC' },
  });

  return tasks;
}

///

export async function findTask(id: string): Promise<Tasks> {
  const repository = getCustomRepository(TasksRepository);
  const task = await repository.findOne({ where: { id } });

  if (!task) {
    throw new ApiError(400, false, 'Tarefa não existe');
  }

  return task;
}

///

export async function editTask(task: {
  id: string;
  title: string;
  description: string;
  complete: boolean;
}): Promise<Tasks> {
  const { id, title, description, complete } = task;

  const repository = getCustomRepository(TasksRepository);
  const selectedTask = await repository.findOne({ where: { id } });
  const titleExists = await repository.findOne({
    where: { title, id: Not(Equal(id)) },
  });

  if (!selectedTask) {
    throw new ApiError(400, false, 'Tarefa não existe');
  } else if (titleExists) {
    throw new ApiError(400, false, 'Já existe uma tarefa com este título');
  }

  selectedTask.title = title;
  selectedTask.description = description;
  selectedTask.complete = complete;

  await repository.save(selectedTask);
  return selectedTask;
}

///

export async function deleteTask(id: string): Promise<void> {
  const repository = getCustomRepository(TasksRepository);
  const task = await repository.findOne({ where: { id } });

  if (!task) {
    throw new ApiError(400, false, 'Tarefa não existe');
  }

  await repository.remove(task);
}
