import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createUser, authenticateUser } from "./userApi";
import { UserRegistrationData, UserLoginData } from "../types";

const router = Router();

// Validation middleware
const validateRegistration = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Registration endpoint
router.post(
  "/register",
  validateRegistration,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const userData: UserRegistrationData = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await createUser(userData);

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);

// Login endpoint
router.post("/login", validateLogin, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const userData: UserLoginData = {
      email: req.body.email,
      password: req.body.password,
    };

    const authResponse = await authenticateUser(userData);

    res.json(authResponse);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;
