import { Router } from 'express';
import {
  createUserHandler,
  loginUserHandler,
} from '../../controllers/user.controller';
import validateResource from '../../middlewares/validateResource';
import { createUserSchema } from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 * /api/v1/users:
 *  post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreateUserResponse'
 */
routes
  .post('/', validateResource(createUserSchema), createUserHandler)
  .post('/login', loginUserHandler);

export default routes;
