import express from 'express';
const router = express.Router();

import newsController from '../controllers/news.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

router.post('/', authMiddleware, newsController.create);
router.get('/', newsController.findAll);
router.get('/top', newsController.topNews);

export default router;
