import type { VercelRequest, VercelResponse } from '@vercel/node';
import { cors, authMiddleware, AuthRequest, handleError } from '../_lib/middleware';

export default async function handler(req: AuthRequest, res: VercelResponse) {
  if (cors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!authMiddleware(req, res)) return;

    const { userId, email } = req.user!;
    
    res.json({
      id: userId,
      email,
    });
  } catch (error) {
    handleError(res, error, 'Failed to get user info');
  }
}
