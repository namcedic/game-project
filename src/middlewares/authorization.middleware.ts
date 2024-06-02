import { NextFunction, Response } from 'express';
import { UserEntity } from '@database/entities/user.entity';
import { AppDataSource } from '@database/data-source';

export const authorization = (roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = await userRepo.findOne({
      where: { id: req.currentUser.id },
    });
    if (!user) {
      throw new Error('Unauthorized');
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
