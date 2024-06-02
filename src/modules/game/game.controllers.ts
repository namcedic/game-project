import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { GameService } from '@modules/game/game.service';
import { GameDto } from '@modules/game/dtos/requests/game-dto';
import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@common/errors/custom-error';

export class GameController {
  constructor(private gameService: GameService) {}
  public async createGame(req: Request, res: Response, next: NextFunction) {
    try {
      const gameDto: GameDto = plainToInstance(GameDto, req.body);
      const validateErrors = await validate(gameDto);
      if (validateErrors?.length) {
        this.handlerErrors(validateErrors);
      }
      const gameResponse = await this.gameService.create(gameDto);

      return res
        .status(200)
        .json({ message: 'Game created successfully', gameResponse });
    } catch (error) {
      next(error);
    }
  }

  public async updateGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const updateGame: GameDto = plainToInstance(GameDto, req.body);
      const validateErrors = await validate(updateGame);
      if (validateErrors?.length) {
        this.handlerErrors(validateErrors);
      }

      await this.gameService.updateGame(idNumber, updateGame);

      return res.status(200).json({ message: 'Game updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async getGames(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query;
      const games = await this.gameService.getGames({
        limit: Number(limit),
        page: Number(page),
      });

      return res.status(200).json({ message: 'Get Games successfully', games });
    } catch (error) {
      next(error);
    }
  }

  public async getGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const game = await this.gameService.getGame(Number(id));

      return res
        .status(200)
        .json({ message: 'Get game profile successfully', game });
    } catch (error) {
      next(error);
    }
  }

  public async deleteGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      await this.gameService.deleteGame(idNumber);

      return res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  private handlerErrors(validateErrors: ValidationError[]) {
    const errorMessages: string[] = [];
    validateErrors.forEach((error: ValidationError) => {
      if (error.constraints) {
        const errors = Object.values(error.constraints);
        errorMessages.push(errors.join('; '));
      }
    });
    throw new BadRequestException(errorMessages.join('; '));
  }
}
