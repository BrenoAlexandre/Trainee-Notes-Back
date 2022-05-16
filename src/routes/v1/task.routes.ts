import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  findAllTasksHandler,
  findTaskHandler,
} from '../../controllers/task.controller';
import validateResource from '../../middlewares/validateResource';
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from '../../schemas/task.schema';

const routes = Router();

routes
  .route('')
  .get(findAllTasksHandler)
  .post(validateResource(createTaskSchema), createTaskHandler);

routes
  .route('/:id')
  .get(validateResource(getTaskSchema), findTaskHandler)
  .put(validateResource(updateTaskSchema), editTaskHandler)
  .delete(validateResource(deleteTaskSchema), deleteTaskHandler);

export default routes;
