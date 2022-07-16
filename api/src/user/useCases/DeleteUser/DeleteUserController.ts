import { IErrorMessage } from '@shared/index';
import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

export default class DeleteUserController {
  constructor(private useCase: DeleteUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const userId = request.userId;

    try {
      const userWasDeleted = await this.useCase.execute({
        id: userId,
      });

      if (!userWasDeleted) {
        throw new Error('User not found to be deleted.');
      }

      return response.status(200).json(userWasDeleted);
    } catch (error) {
      IErrorMessage(response, error.message, 400);
    }
  }
}
