import * as express from 'express';
import { AuthController } from '@modules/auth/auth.controllers';
import { AuthService } from '@modules/auth/auth.service';
const Router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

Router.post('/signup', authController.signup.bind(authController));
Router.post('/login', authController.login.bind(authController));

export { Router as authRouter };
