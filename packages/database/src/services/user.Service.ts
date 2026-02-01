import { usersTable } from "../db/schema";
import { db } from "../index";
import { v4 as uuid4 } from "uuid";
type RegisterUserInput = {
  name: string;
  email: string;
  age: number;
};

export const registerUser = async ({ name, email, age }: RegisterUserInput) => {
  try {
    if (!db) {
      throw new Error("Database not initialized");
    }

    const result = await db.insert(usersTable).values({
      id: uuid4(),
      name,
      age,
      email,
    });

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error("❌ registerUser failed:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
