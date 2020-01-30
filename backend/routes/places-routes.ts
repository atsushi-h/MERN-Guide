import { Router } from 'express';

import {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
} from '../controllers/places-controller';

const router = Router();

router.get('/:pid', getPlaceById);
router.get('/user/:uid', getPlaceByUserId);

router.post('/', createPlace);

router.patch('/:pid', updatePlace);

export default router;
