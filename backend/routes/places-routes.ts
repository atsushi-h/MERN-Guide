import { Router } from 'express';
import { check } from 'express-validator';

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from '../controllers/places-controller';
import fileUpload from '../middleware/file-upload';
import checkAuth from '../middleware/check-auth';

const router = Router();

router.get('/:pid', getPlaceById);
router.get('/user/:uid', getPlacesByUserId);

// ログイン確認
// エラーの場合、これより下の処理をブロック
router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty(),
  ],
  createPlace
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
  ],
  updatePlace
);

router.delete('/:pid', deletePlace);

export default router;
