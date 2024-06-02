import * as express from 'express';
import { GameController } from '@modules/game/game.controllers';
import { authorization } from '@middlewares/authorization.middleware';
import { RoleEnum } from '@common/constants/role-enum';
import { authentication } from '@middlewares/auth.middleware';
import { GameService } from '@modules/game/game.service';
const Router = express.Router();

const gameService = new GameService();
const gameController = new GameController(gameService);
Router.get(
  '',
  authentication,
  authorization([RoleEnum.ADMIN]),
  gameController.getGames.bind(gameController)
);
Router.get(
  '/:id',
  authentication,
  authorization([RoleEnum.ADMIN, RoleEnum.USER]),
  gameController.getGame.bind(gameController)
);
Router.post('', gameController.createGame.bind(gameController));
Router.put(
  '/:id',
  authentication,
  authorization([RoleEnum.ADMIN]),
  gameController.updateGame.bind(gameController)
);
Router.delete(
  '/:id',
  authentication,
  authorization([RoleEnum.ADMIN]),
  gameController.deleteGame.bind(gameController)
);
export { Router as gameRouter };
