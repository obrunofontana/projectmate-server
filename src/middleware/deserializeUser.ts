import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(401, 'Token inválido'));
    }

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'accessTokenPublicKey'
    );

    if (!decoded) {
      return next(new AppError(401,  'Token inválido ou usuário não existe.'));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, 'Token inválido ou expirado'));
    }

    const user = await findUserById(JSON.parse(session).id);

    if (!user) {
      return next(new AppError(401, 'Token inválido ou expirado'));
    }

    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
