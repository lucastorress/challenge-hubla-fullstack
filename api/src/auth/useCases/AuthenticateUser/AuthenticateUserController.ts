import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export default class AuthenticateUserController {
  constructor(private useCase: AuthenticateUserUseCase) {}
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await this.useCase.execute({ email, password });

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_TIME_TO_EXPIRE,
      });

      const { password: pass, ...userResponse } = user;

      return response.status(200).json({
        user: userResponse,
        token,
      });
    } catch (error) {
      if (error.message) {
        response.status(401).json(error.message);
      } else {
        response.status(400).json('Internal Server Error');
      }
    }
  }
}
