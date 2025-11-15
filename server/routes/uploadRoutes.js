import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/image', protect, uploadImage);
router.delete('/image/:publicId', protect, deleteImage);

export default router;
