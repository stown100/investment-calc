import {
  User,
  UserRegistrationData,
  UserLoginData,
  AuthResponse,
} from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../../db";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const createUser = async (
  userData: UserRegistrationData
): Promise<User> => {
  const { email, password } = userData;

  // Check if user already exists
  const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const now = new Date().toISOString();
  const userId = Math.random().toString(36).substr(2, 9);

  const result = await db.run(
    "INSERT INTO users (id, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
    [userId, email, hashedPassword, now, now]
  );

  if (result.changes === 0) {
    throw new Error("Failed to create user");
  }

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
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
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
  const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
  return user || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  return user || null;
};
