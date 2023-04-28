import { createClient } from 'redis';
const client = createClient({
    host: 'redis-server',
    port: 6379
});

client.on('error', err => console.log('Redis Client Error', err));

export async function redisSetter(date) {
    await client.connect();

    await client.set('currency', JSON.stringify(date));
    await client.set('updateDate', JSON.stringify({updateDate: new Date().toLocaleString()}));

    await client.disconnect();

    console.log('Data is set!')
}

export async function redisGetter() {
    await client.connect();

    const currency = await client.get('currency');
    const updateDate = await client.get('updateDate');
    
    await client.disconnect();

    return currency;
}