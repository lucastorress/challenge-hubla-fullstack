import { IErrorMessage } from '../../../shared';
import { Request, Response } from 'express';
import { GetUserUseCase } from './GetUserUseCase';

export default class GetUserController {
  constructor(private useCase: GetUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const userId = request.userId;

    try {
      const user = await this.useCase.execute({
        id: userId,
      });

      return response.status(200).json(user);
    } catch (error) {
      IErrorMessage(response, error.message, 400);
    }
  }
}
