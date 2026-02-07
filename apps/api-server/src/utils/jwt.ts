import jwt, { JwtPayload, SignOptions, TokenExpiredError } from "jsonwebtoken";
import { EnvConfig } from "../utils/envConfig";

type RefreshTokenPayload = {
  id: string;
};

type AccessTokenPayload = {
  id: string;
  email: string;
  name: string;
};

export class JWT {
  static signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, EnvConfig.JWT_ACCESS_TOKEN, {
      expiresIn: EnvConfig.JWT_ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"],
    });
  }

  static verifyAccessToken(token: string) {
    try {
      const payload = jwt.verify(
        token,
        EnvConfig.JWT_REFRESH_TOKEN,
      ) as JwtPayload & AccessTokenPayload;

      return { valid: true, payload } as const;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { valid: false, reason: "EXPIRED" } as const;
      }
      return { valid: false, reason: "INVALID" } as const;
    }
  }

  static signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, EnvConfig.JWT_REFRESH_TOKEN, {
      expiresIn: EnvConfig.JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
    });
  }

  static verifyRefreshToken(token: string) {
    try {
      const payload = jwt.verify(
        token,
        EnvConfig.JWT_REFRESH_TOKEN,
      ) as JwtPayload & RefreshTokenPayload;

      return { valid: true, payload } as const;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { valid: false, reason: "EXPIRED" } as const;
      }
      return { valid: false, reason: "INVALID" } as const;
    }
  }
}
