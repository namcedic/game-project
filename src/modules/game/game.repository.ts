import { AppDataSource } from '@database/data-source';
import { GameEntity } from '@database/entities/game.entity';

export const gameRepository = AppDataSource.getRepository(GameEntity);
