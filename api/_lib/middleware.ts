import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends VercelRequest {
  user?: {
    userId: string;
    email: string;
  };
}

export function cors(req: VercelRequest, res: VercelResponse) {
  const origin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

export function authMiddleware(req: AuthRequest, res: VercelResponse): boolean {
  const token = req.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return false;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    return true;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return false;
  }
}

export function handleError(res: VercelResponse, error: any, defaultMessage = 'Internal server error') {
  console.error('API Error:', error);
  
  if (error.message) {
    res.status(error.status || 500).json({ message: error.message });
  } else {
    res.status(500).json({ message: defaultMessage });
  }
}
