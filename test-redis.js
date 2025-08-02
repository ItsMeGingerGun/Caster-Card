require('dotenv').config();
const Redis = require('ioredis');

async function testConnection() {
  try {
    const redis = new Redis(process.env.REDIS_URL, {
      tls: { rejectUnauthorized: false }
    });
    
    await redis.set('test', 'success', 'EX', 10);
    const value = await redis.get('test');
    
    console.log('✅ Redis test successful:', value);
    process.exit(0);
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    process.exit(1);
  }
}

testConnection();
