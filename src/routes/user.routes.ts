import * as express from 'express';
import { UserController } from '@modules/user/user.controllers';
import { UserService } from '@modules/user/user.service';
import { authorization } from '../middlewares/authorization.middleware';
import { RoleEnum } from '@common/constants/enum';
import { authentication } from '../middlewares/auth.middleware';
const Router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);
// Router.get(
//   "/users",
//   // authentication,
//   // authorization(["admin"]),
//   UserController.getUsers
// );
Router.get(
  '/profile',
  authentication,
  authorization(['user', 'admin']),
  userController.getProfile.bind(userController)
);
Router.post('/signup', userController.signup.bind(userController));
Router.put(
  '/:id',
  authentication,
  authorization([RoleEnum.ADMIN]),
  userController.updateUser.bind(userController)
);
Router.delete(
  '/:id',
  authentication,
  authorization(['admin']),
  userController.deleteUser.bind(userController)
);
export { Router as userRouter };
