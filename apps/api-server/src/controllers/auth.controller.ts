import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas";
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

const loginUser = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.flatten(),
      });
    }
    const { identifier, password } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const { success, user, error } =
      await UserRepository.checkExistingUser(identifier);

    if (!success) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error,
      });
    }

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwword);

    if (!passwordMatch) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};


const logoutUser=async (req: Request, res: Response) => {
  try {   
    //todo:i should implement it but for now i will just return success response
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}