import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, signup, login } from '../controllers/users-controller';
import fileUpload from '../middleware/file-upload';

const router = Router();

router.get('/', getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);

router.post('/login', login);

export default router;
