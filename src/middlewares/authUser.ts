import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { reIssueToken } from '../services/user.service';
import { verifyJwt } from '../utils/jwt.utils';

const verifyToken = () => (req: Request, res: Response, next: NextFunction) => {
  const token = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'headers.refresh');

  if (token === null) {
    return res.status(403).send({ error: 'Usuário não autorizado' });
  }

  const { decoded, expired } = verifyJwt(token);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = reIssueToken(refreshToken);

    if (newAccessToken) {
      res.setHeader('authorization', newAccessToken.toString());
    }

    const result = verifyJwt(newAccessToken.toString());

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default verifyToken;
