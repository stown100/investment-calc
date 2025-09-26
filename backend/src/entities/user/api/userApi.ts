import {
  User,
  UserRegistrationData,
  UserLoginData,
  AuthResponse,
} from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usersCollection, openDb } from "../../../db";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const createUser = async (
  userData: UserRegistrationData
): Promise<User> => {
  const { email, password } = userData;

  await openDb();
  const col = usersCollection();
  const existingUser = await col.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const now = new Date().toISOString();
  const userId = Math.random().toString(36).substr(2, 9);
  await col.insertOne({
    id: userId,
    email,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: userId,
    email,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  };
};

export const authenticateUser = async (
  userData: UserLoginData
): Promise<AuthResponse> => {
  const { email, password } = userData;

  // Find user by email
  await openDb();
  const col = usersCollection();
  const user = await col.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

export const getUserById = async (id: string): Promise<User | null> => {
  await openDb();
  const col = usersCollection();
  const user = await col.findOne({ id }, { projection: { _id: 0 } });
  return (user as any) || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  await openDb();
  const col = usersCollection();
  const user = await col.findOne({ email }, { projection: { _id: 0 } });
  return (user as any) || null;
};
