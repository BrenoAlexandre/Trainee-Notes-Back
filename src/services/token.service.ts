import config from '../config/config';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

export function createToken(user?: {
  name: string;
  email: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}) {
  if (!user) throw new Error('Password or email are invalid');

  const { accessTokenTtl, refreshTokenTtl } = config;

  const accessToken = signJwt(user, { expiresIn: accessTokenTtl });
  const refreshToken = signJwt(user, { expiresIn: refreshTokenTtl });

  return { accessToken, refreshToken };
}

///

export function reIssueToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded) throw new Error('Invalid refresh token');

  const user = findUser(decoded.email);

  if (!user) throw new Error('Password or email are invalid');

  const newAccessToken = signJwt(user, { expiresIn: config.accessTokenTtl });

  return newAccessToken;
}
