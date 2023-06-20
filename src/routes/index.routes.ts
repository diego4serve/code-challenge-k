import { Router } from "express";
import authRoutes from './auth.routes'
import scrapRoutes from './scrap.routes'
import { isAuthenticated } from "../middleware/auth.middleware";
import { homeController } from "../controllers/home.controller";

const router = Router()

router.use(authRoutes);
router.use('/scraps', isAuthenticated, scrapRoutes)
router.get('/', homeController.index)

export default router;