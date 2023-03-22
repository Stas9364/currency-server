import { createClient } from 'redis';
const client = createClient({
    host: 'redis-server',
    port: 6379
});

client.on('error', err => console.log('Redis Client Error', err));

export async function redisSetter(date) {
    await client.connect();

    await client.set('currency', JSON.stringify(date));

    await client.get('currency');

    await client.disconnect();
}

export async function redisGetter() {
    await client.connect();

    const value = await client.get('currency');
    
    await client.disconnect();

    return value;
}