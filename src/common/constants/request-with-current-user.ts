import { Request } from 'express';
export interface RequestWithCurrentUser extends Request {
  currentUser?: {
    id: string;
    role: string;
  };
}
