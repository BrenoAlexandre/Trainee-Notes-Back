import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  findAllTasksHandler,
  findTaskHandler,
  findUserTasksHandlers,
} from '../../controllers/task.controller';
import verifyToken from '../../middlewares/authUser';

const routes = Router();

routes
  .route('')
  .get(verifyToken(), findAllTasksHandler)
  .post(verifyToken(), createTaskHandler);

routes.route('/userId/:id').get(verifyToken(), findUserTasksHandlers);

routes
  .route('/:id')
  .get(verifyToken(), findTaskHandler)
  .put(verifyToken(), editTaskHandler)
  .delete(verifyToken(), deleteTaskHandler);

export default routes;
