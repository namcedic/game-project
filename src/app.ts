import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { userRouter } from './routes/user.routes';
import { AppDataSource } from '@database/data-source';
import { authRouter } from './routes/auth.routes';
import { gameRouter } from './routes/game.routes';
dotenv.config();

const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/game', gameRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(505).json({ message: 'Bad Request' });
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
