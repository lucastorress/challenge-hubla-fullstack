import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { IErrorMessage } from '@shared/index';

export default class UpdateUserController {
  constructor(private useCase: UpdateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const userId = request.userId;
    const { name, email, password, role } = request.body;

    try {
      const user = await this.useCase.execute({
        userId,
        body: {
          name,
          email,
          password,
          role,
        },
      });

      return response.status(201).json(user);
    } catch (error) {
      IErrorMessage(response, error.message, 400);
    }
  }
}
