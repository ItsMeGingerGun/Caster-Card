import Redis from 'ioredis';

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error('REDIS_URL is not defined');
};

let redis: Redis | null = null;

if (process.env.NODE_ENV !== 'test') {
  redis = new Redis(getRedisUrl());
}

export const getRedisClient = () => {
  if (!redis) {
    throw new Error('Redis client not initialized');
  }
  return redis;
};

// Helper functions for template management
export const redisKeys = {
  userTemplates: (fid: number) => `user:${fid}:templates`,
  template: (id: string) => `template:${id}`,
  publicTemplates: 'public:templates',
};

// Template data structure
interface TemplateData {
  id: string;
  fid: number;
  theme_config: string;
  created_at: number;
  is_public: boolean;
}

export const saveTemplate = async (template: Omit<TemplateData, 'id' | 'created_at'>) => {
  const client = getRedisClient();
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  const templateData: TemplateData = {
    id,
    ...template,
    created_at: Date.now(),
  };
  
  // Save template
  await client.hset(redisKeys.template(id), {
    fid: templateData.fid.toString(),
    theme_config: templateData.theme_config,
    created_at: templateData.created_at.toString(),
    is_public: templateData.is_public ? '1' : '0',
  });
  
  // Add to user templates
  await client.sadd(redisKeys.userTemplates(template.fid), id);
  
  // Add to public templates if public
  if (template.is_public) {
    await client.sadd(redisKeys.publicTemplates, id);
  }
  
  return id;
};

export const getTemplate = async (id: string) => {
  const client = getRedisClient();
  const data = await client.hgetall(redisKeys.template(id));
  
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  
  return {
    id,
    fid: parseInt(data.fid),
    theme_config: data.theme_config,
    created_at: parseInt(data.created_at),
    is_public: data.is_public === '1',
  };
};

export const getUserTemplates = async (fid: number) => {
  const client = getRedisClient();
  const templateIds = await client.smembers(redisKeys.userTemplates(fid));
  
  const templates = await Promise.all(
    templateIds.map(id => getTemplate(id))
  );
  
  return templates.filter(template => template !== null) as TemplateData[];
};

export const getPublicTemplates = async () => {
  const client = getRedisClient();
  const templateIds = await client.smembers(redisKeys.publicTemplates);
  
  const templates = await Promise.all(
    templateIds.map(id => getTemplate(id))
  );
  
  return templates.filter(template => template !== null) as TemplateData[];
};

export const deleteTemplate = async (id: string, fid: number) => {
  const client = getRedisClient();
  
  // Remove from user templates
  await client.srem(redisKeys.userTemplates(fid), id);
  
  // Remove from public templates
  await client.srem(redisKeys.publicTemplates, id);
  
  // Delete template data
  await client.del(redisKeys.template(id));
};
