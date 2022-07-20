import { Request, Response } from 'express';
import { IErrorMessage } from '../../../shared';
import { CreateUserUseCase } from './CreateUserUseCase';

export default class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { name, email, password, role } = request.body;

    try {
      const user = await this.useCase.execute({
        name,
        email,
        password,
        role,
      });

      return response.status(201).json(user);
    } catch (error) {
      IErrorMessage(response, error.message, 400);
    }
  }
}
