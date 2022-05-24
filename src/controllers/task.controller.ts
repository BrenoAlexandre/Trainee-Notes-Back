import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import {
  createTask,
  deleteTask,
  editTask,
  findAllTasks,
  findTask,
  findTasksById,
} from '../services/task.service';

export async function createTaskHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const { title, description } = req.body;

  const tasks = await createTask({ title, description, complete: false });

  return res.status(StatusCodes.CREATED).json(tasks);
}

export async function findAllTasksHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const tasks = await findAllTasks();

  return res.status(StatusCodes.OK).json(tasks);
}

export async function findUserTasksHandlers(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const tasks = await findTasksById(id);

  return res.status(StatusCodes.OK).json(tasks);
}

export async function findTaskHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const task = await findTask(id);

  return res.status(StatusCodes.OK).json(task);
}

export async function editTaskHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { title, description, complete } = req.body;
  const task = await editTask({ id, title, description, complete });

  return res.status(StatusCodes.OK).json(task);
}

export async function deleteTaskHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  await deleteTask(id);

  return res.status(StatusCodes.OK).json();
}
