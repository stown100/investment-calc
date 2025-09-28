import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, usersCollection } from '../_lib/db';
import { cors, handleError } from '../_lib/middleware';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    await connectToDatabase();
    const users = usersCollection();

    // Check if user already exists
    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = {
      id: randomUUID(),
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    handleError(res, error, 'Failed to create user');
  }
}
