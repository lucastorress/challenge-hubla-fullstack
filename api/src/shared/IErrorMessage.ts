import { Response } from 'express';

const IErrorMessage = (response: Response, msg: string, statusCode: number) => {
  const template = {
    msg,
    error: statusCode,
  };
  response.status(statusCode).json(template || 'Internal Server Error');
};

export { IErrorMessage };
