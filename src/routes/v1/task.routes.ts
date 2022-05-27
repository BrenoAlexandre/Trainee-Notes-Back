import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  findTaskHandler,
  findUserTasksHandlers,
} from '../../controllers/task.controller';

const routes = Router();

routes.route('').post(createTaskHandler);

routes.route('/userId/:id').get(findUserTasksHandlers);

routes
  .route('/:id')
  .get(findTaskHandler)
  .put(editTaskHandler)
  .delete(deleteTaskHandler);

export default routes;
