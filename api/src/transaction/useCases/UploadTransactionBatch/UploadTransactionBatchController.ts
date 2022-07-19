import { Request, Response } from 'express';
import { UploadTransactionBatchUseCase } from './UploadTransactionBatchUseCase';
import { IRequestTransactionBatchDTO } from './TransactionBatchDTO';
import {
  transactionFileProperties as transform,
  splitStringIntoChunks,
} from './TransactionTransform';
import { IErrorMessage } from '../../../shared';

export default class UploadTransactionBatchController {
  constructor(private useCase: UploadTransactionBatchUseCase) {}

  public async handle(request: Request, response: Response) {
    const { file } = request;
    try {
      if (file.mimetype !== 'text/plain') {
        return response.status(400).json('Apenas arquivos com extensão .txt');
      }
      const batch = file.buffer.toString('utf8');

      const transactionChunks = batch.match(
        new RegExp('.{1,' + transform.properties.totalSize + '}', 'g'),
      );

      const transactions: IRequestTransactionBatchDTO[] = [];

      for (let transactionChunkStr of transactionChunks) {
        const [type, date, productTitle, price, seller] = splitStringIntoChunks(
          transactionChunkStr,
          transform.properties.indexes,
        );

        transactions.push({
          type: +type,
          date: new Date(date),
          productTitle,
          price: +price / 100,
          seller,
        });
      }

      const result = await this.useCase.execute(transactions);

      return response.send(result);
    } catch (error) {
      IErrorMessage(response, error.message, 400);
    }
  }
}
