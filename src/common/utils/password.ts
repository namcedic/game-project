import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: string;
  role: string;
};

const { JWT_SECRET = '' } = process.env;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const comparePassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
