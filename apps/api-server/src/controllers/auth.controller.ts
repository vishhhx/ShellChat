import { Request, Response } from "express";
import { registerSchema } from "../schemas";
import { HttpStatus } from "../utils";
import { UserRepository } from "@repo/database/userServices";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.flatten(),
      });
    }

    const { name, email, password } = parsedData.data;

    const { exists } = await UserRepository.checkExistingUser(email);
    if (exists) {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await UserRepository.registerUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!result.success) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User registered successfully please verify",
      user: result.user,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};
