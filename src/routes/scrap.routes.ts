import { Router } from 'express';
import { scrapController } from '../controllers/scrap.controller';

const router = Router()

router.post('/', scrapController.create);
router.get('/', scrapController.findAll);
router.get('/:scrapId', scrapController.show);

export default router;