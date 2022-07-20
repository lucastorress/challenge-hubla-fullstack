import { Router } from 'express';
import multer = require('multer');
import { uploadTransactionBatchController } from './transaction';

import { authenticateUserController, authMiddleware } from './auth';

import {
  addProducerToAffiliateController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from './user';

/**
 * We will use multer package to allow upload of files
 */
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10000 },
}).single('file');

const router = Router();

// Redirect
router.get('/', (request, response) => {
  response.redirect(301, '/api-docs');
});

// Auth
router.post('/auth/login', (request, response) => {
  return authenticateUserController.handle(request, response);
});

// Transactions
router.post(
  '/transaction/upload',
  authMiddleware,
  upload,
  (request, response) => {
    return uploadTransactionBatchController.handle(request, response);
  },
);

// Users
router.get('/user', authMiddleware, (request, response) => {
  return getUserController.handle(request, response);
});
router.post('/user', (request, response) => {
  return createUserController.handle(request, response);
});
router.put('/user', authMiddleware, (request, response) => {
  return updateUserController.handle(request, response);
});
router.delete('/user', authMiddleware, (request, response) => {
  return deleteUserController.handle(request, response);
});
router.post(
  '/user/addProducerAffiliate',
  authMiddleware,
  (request, response) => {
    return addProducerToAffiliateController.handle(request, response);
  },
);

export { router };
