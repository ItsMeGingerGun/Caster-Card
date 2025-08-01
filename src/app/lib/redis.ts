import Redis from 'ioredis';

let redisClient: Redis | null = null;

export const getRedisClient = () => {
  if (redisClient) return redisClient;
  
  const url = process.env.REDIS_URL;
  
  if (!url) {
    throw new Error('REDIS_URL environment variable not set');
  }

  redisClient = new Redis(url, {
    tls: {
      rejectUnauthorized: false
    },
    connectTimeout: 10000,
    maxRetriesPerRequest: 2
  });

  return redisClient;
};
