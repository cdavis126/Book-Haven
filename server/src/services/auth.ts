import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

const secretKey = process.env.JWT_SECRET || '';

export const authenticateToken = ({ req }: { req: any }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  // Extract token from Bearer header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, return request object as is
  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secretKey, { maxAge: '2h' }) as { data: JwtPayload };
    req.user = data; // Attach user data to request
  } catch (err) {
    console.log('❌ Invalid token');
  }

  return req;
};

export const signToken = (username: string, email: string, _id: string) => {
  const payload: JwtPayload = { username, email, _id };
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: { code: 'UNAUTHENTICATED' },
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};

