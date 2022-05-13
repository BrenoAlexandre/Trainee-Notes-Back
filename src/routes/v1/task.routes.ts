import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  findAllTasksHandler,
  findTaskHandler,
} from 'src/controllers/task.controller';

const routes = Router();

routes
  .route('')
  .post(
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
        description: Joi.string().required(),
        complete: Joi.bool().required(),
      },
    }),
    createTaskHandler,
  )
  .get(findAllTasksHandler);

routes
  .route('/:id')
  .get(
    celebrate({
      [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    findTaskHandler,
  )
  .put(
    celebrate({
      [Segments.PARAMS]: { id: Joi.string().uuid().required() },
      [Segments.BODY]: {
        title: Joi.string().required(),
        description: Joi.string().required(),
        complete: Joi.bool().required(),
      },
    }),
    editTaskHandler,
  )
  .delete(
    celebrate({
      [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    deleteTaskHandler,
  );

export default routes;
