import { Router } from 'express';
import { createTokenHandler } from '../../controllers/token.controller';

const routes = Router();

routes.route('/').get(createTokenHandler).post();

export default routes;
