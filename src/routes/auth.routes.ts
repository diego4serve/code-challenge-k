import { Request, Response, Router } from 'express';
import passport from '../config/passport.config';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.get('/register', authController.showRegister)
router.post('/register', authController.register);
router.get('/login', authController.showLogin)
router.post('/login', passport.authenticate('local'), authController.login);
router.get('/logout', authController.logout);
router.get('/profile', authController.profile);

export default router;
