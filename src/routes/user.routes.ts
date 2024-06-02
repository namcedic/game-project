import * as express from 'express';
import { UserController } from '@modules/user/user.controllers';
import { UserService } from '@modules/user/user.service';
import { authorization } from '@middlewares/authorization.middleware';
import { RoleEnum } from '@common/constants/role-enum';
import { authentication } from '@middlewares/auth.middleware';
const Router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);
Router.get(
  '',
  authentication,
  authorization([RoleEnum.ADMIN]),
  userController.getUsers.bind(userController)
);
Router.get(
  '/profile',
  authentication,
  authorization([RoleEnum.ADMIN, RoleEnum.USER]),
  userController.getProfile.bind(userController)
);
Router.put(
  '/:id',
  authentication,
  authorization([RoleEnum.ADMIN]),
  userController.updateUser.bind(userController)
);
Router.delete(
  '/:id',
  authentication,
  authorization([RoleEnum.ADMIN]),
  userController.deleteUser.bind(userController)
);
export { Router as userRouter };
