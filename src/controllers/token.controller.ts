import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../config/logger';
import { createToken } from '../services/token.service';

export async function createTokenHandler(req: Request, res: Response) {
  try {
    const { accessToken, refreshToken } = createToken(req.body);
    res.set('authorization', `Bearer ${accessToken}`);
    res.set('refresh-auth', refreshToken);
    res.status(204).send();
  } catch (e: any) {
    logger.error(e);
    res.status(StatusCodes.CONFLICT).send(e.message);
  }
}
