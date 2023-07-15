const Redis = require('ioredis');

function connectToRedis() {
  const client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  });

  client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
  });

  return client;
}

module.exports = connectToRedis;
