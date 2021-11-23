import { Express, Request, Response } from 'express';
// import userRoutes from './v1/user.routes';

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // app.use('/api/v1/users', userRoutes(app));
}

export default routes;
