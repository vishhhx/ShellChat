import { eq, or } from "drizzle-orm";
import { usersTable } from "../db/schema";
import { db } from "../index";
import { v4 as uuid4 } from "uuid";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export class UserRepository {
  static async registerUser({ name, email, password }: RegisterUserInput) {
    try {
      if (!db) {
        throw new Error("Database not initialized");
      }

      const userId = uuid4();
      await db.insert(usersTable).values({
        id: userId,
        name,
        email,
        passwordHash: password,
      });

      return {
        success: true,
        user: {
          id: userId,
          name,
          email,
          createdAt: new Date(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  static async checkExistingUser(identifier: string) {
    try {
      if (!db) {
        throw new Error("Database not initialized");
      }

      const user = await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(
          or(eq(usersTable.email, identifier), eq(usersTable.name, identifier)),
        )
        .limit(1);

      return {
        success: true,
        exists: user.length > 0,
        user: user.length > 0 ? user[0] : null,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  static async getUserByIdentifier(identifier: string) {
    try {
      if (!db) {
        throw new Error("Database not initialized");
      }

      const user = await db
        .select()
        .from(usersTable)
        .where(
          or(eq(usersTable.email, identifier), eq(usersTable.name, identifier)),
        )
        .limit(1);

      return {
        success: true,
        user: user.length > 0 ? user[0] : null,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
