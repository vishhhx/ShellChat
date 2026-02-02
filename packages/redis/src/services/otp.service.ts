import { getRedisClient } from "../client";

type OtpPurpose = "login" | "email" | "reset";

export class OtpService {
  private static key(purpose: OtpPurpose, identifier: string) {
    return `otp:${purpose}:${identifier}`;
  }

  static async storeOtp(
    purpose: OtpPurpose,
    identifier: string,
    otp: string,
    ttlSeconds: number,
  ): Promise<void> {
    const client = await getRedisClient();
    await client.setEx(this.key(purpose, identifier), ttlSeconds, otp);
  }

  static async consumeOtp(
    purpose: OtpPurpose,
    identifier: string,
    otp: string,
  ): Promise<boolean> {
    const client = await getRedisClient();
    const storedOtp = await client.get(this.key(purpose, identifier));

    if (storedOtp === otp) {
      await client.del(this.key(purpose, identifier));
      return true;
    }

    return false;
  }
}
