import { object, string, boolean, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     task:
 *       type: object
 *       required:
 *        - title
 *        - description
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         complete:
 *           type: boolean
 */

const payload = {
  body: object({
    title: string().defined('Title is required'),
    description: string()
      .defined('Description is required')
      .default('No description'),
    complete: boolean().default(false),
  }).defined(),
};

const params = {
  params: object({ id: string().defined('taskId is required') }),
};

export const createTaskSchema = object({
  ...payload,
});

export const updateTaskSchema = object({
  ...payload,
  ...params,
});

export const deleteTaskSchema = object({
  ...params,
});

export const getTaskSchema = object({
  ...params,
});

export type CreateTaskInput = InferType<typeof createTaskSchema>;
export type UpdateTaskInput = InferType<typeof updateTaskSchema>;
export type ReadTaskInput = InferType<typeof getTaskSchema>;
export type DeleteTaskInput = InferType<typeof deleteTaskSchema>;
