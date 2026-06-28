import Redis from "ioredis";

const createClient = () =>
  new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: null,
  });

if (process.env.NODE_ENV !== "production") {
  if (!global.redisGlobal) global.redisGlobal = createClient();
}

export const redis = global.redisGlobal ?? createClient();
