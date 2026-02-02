import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;
let connecting: Promise<RedisClientType> | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (client?.isOpen) return client;
  if (connecting) return connecting;

  connecting = (async () => {
    try {
      client = createClient({
        socket: {
          host: process.env.REDIS_HOST || "localhost",
          port: Number(process.env.REDIS_PORT) || 6379,
        },
      });

      client.on("error", (err) => {
        console.error("Redis Client Error:", err);
      });

      await client.connect();
      return client;
    } finally {
      connecting = null;
    }
  })();

  return connecting;
}
