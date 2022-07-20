import { NextFunction, Request, Response } from 'express';
import ITokenPayload from './ITokenPayload';
import jwt = require('jsonwebtoken');

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id } = data as ITokenPayload;

    request.userId = id;

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(401);
  }
};

export default authMiddleware;
