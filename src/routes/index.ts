import { Request, Response, Router } from 'express';
import taskRoutes from './v1/task.routes';

const routes = Router();

routes.get('/api/healthcheck', (req: Request, res: Response) =>
  res.sendStatus(200),
);

routes.use('/api/v1/tasks', taskRoutes);

export default routes;
