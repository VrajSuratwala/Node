const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: 'hwgSoEfAbYgyYrTvvYlxyhNIGj9ZTm5W',
    socket: {
        host: 'redis-12737.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12737
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
  await client.connect();

  await client.set('foo', 'bar');
  const result = await client.get('foo');

  console.log(result);
}

connectRedis().catch(console.error);
