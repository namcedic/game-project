import * as express from 'express';
import { AuthController } from '@modules/auth/auth.controllers';
import { AuthService } from '@modules/auth/auth.service';
const Router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);
// Router.get(
//   "/users",
//   // authentication,
//   // authorization(["admin"]),
//   UserController.getUsers
// );
// Router.get(
//   "/profile",
//   authentication,
//   authorization(["user", "admin"]),
//   AuthController.getProfile
// );
Router.post('/signup', authController.signup.bind(authController));
Router.post('/login', authController.login.bind(authController));
// Router.put(
//   "/update/:id",
//   authentication,
//   authorization(["user", "admin"]),
//   UserController.updateUser
// );
// Router.delete(
//   "/delete/:id",
//   authentication,
//   authorization(["admin"]),
//   UserController.deleteUser
// );
export { Router as authRouter };
