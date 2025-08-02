import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedisClient() {
  if (client) return client;

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable not set');
  }

  client = new Redis(redisUrl);
  return client;
}

// Remove template functions for now
