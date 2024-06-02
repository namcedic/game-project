import { plainToInstance } from 'class-transformer';
import { GameDto } from '@modules/game/dtos/requests/game-dto';
import { GetGamesRequest } from '@modules/game/dtos/requests/get-games-request';
import { gameRepository } from '@modules/game/game.repository';
import { GameResponse } from '@modules/game/dtos/responses/user-response';

export class GameService {
  constructor() {}

  public create = async (game: GameDto) => {
    const gameResponse = await gameRepository.save(game);
    return plainToInstance(GameDto, gameResponse);
  };

  public updateGame = async (id: number, game: GameDto) => {
    const existingGame = await gameRepository.findOne({
      where: { id },
    });
    if (!existingGame) {
      throw new Error('Game not found');
    }

    return await gameRepository.update(id, game);
  };

  public getGames = async (getGamesReq: GetGamesRequest) => {
    const page = getGamesReq.page || 1;
    const limit = getGamesReq.limit || 20;
    const skip = (page - 1) * limit;
    const [games, total] = await gameRepository.findAndCount({
      where: { isDeleted: false },
      relations: ['owner'],
      skip,
      take: limit,
    });

    const gamesResponse = plainToInstance(GameResponse, games);

    return {
      data: gamesResponse,
      total,
    };
  };

  public getGame = async (id: number) => {
    const existingGame = await gameRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['owner'],
    });
    if (!existingGame) {
      throw new Error('Game not found');
    }

    return plainToInstance(GameResponse, existingGame);
  };

  public deleteGame = async (id: number) => {
    const existingGame = await gameRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!existingGame) {
      throw new Error('Game not found');
    }

    return await gameRepository.update(
      {
        id,
      },
      {
        isDeleted: true,
      }
    );
  };
}
