import { Router } from 'express';
import multer = require('multer');
import { uploadTransactionBatchController } from './transaction';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10000 },
}).single('file');

router.post('/transaction/upload', upload, (request, response) => {
  return uploadTransactionBatchController.handle(request, response);
});

export { router };
