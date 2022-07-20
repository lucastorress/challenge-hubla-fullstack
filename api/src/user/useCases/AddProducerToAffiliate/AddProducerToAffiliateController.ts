import { IErrorMessage } from '../../../shared/index';
import { Request, Response } from 'express';
import { AddProducerToAffiliateUseCase } from './AddProducerToAffiliateUseCase';

export default class AddProducerToAffiliateController {
  constructor(private useCase: AddProducerToAffiliateUseCase) {}

  public async handle(request: Request, response: Response) {
    const userId = request.userId;

    const { producerId, affiliateId } = request.body;
    try {
      if (producerId !== userId && affiliateId !== userId) {
        throw new Error(`You're not authorized.`);
      } else {
        const userWasDeleted = await this.useCase.execute({
          producerId,
          affiliateId,
        });

        if (!userWasDeleted) {
          throw new Error('User not found to be deleted.');
        }

        return response.status(200).json(userWasDeleted);
      }
    } catch (error) {
      IErrorMessage(response, error.message, 400);
    }
  }
}
