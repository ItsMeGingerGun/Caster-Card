import Redis from 'ioredis';

let redisClient: Redis | null = null;

export const getRedisClient = () => {
  if (redisClient) return redisClient;
  
  const url = process.env.REDIS_URL;
  
  if (!url) {
    throw new Error('REDIS_URL environment variable not set');
  }
// Add these to your redis.ts file
export const getPublicTemplates = async () => {
  const client = getRedisClient();
  const publicTemplates = await client.zrange('public_templates', 0, -1);
  return Promise.all(publicTemplates.map(id => getTemplate(id)));
};

export const getUserTemplates = async (fid: number) => {
  const client = getRedisClient();
  const userTemplates = await client.smembers(`user:${fid}:templates`);
  return Promise.all(userTemplates.map(id => getTemplate(id)));
};
  redisClient = new Redis(url, {
    tls: {
      rejectUnauthorized: false
    },
    connectTimeout: 10000,
    maxRetriesPerRequest: 2
  });

  return redisClient;
};
