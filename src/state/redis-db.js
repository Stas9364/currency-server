import { createClient } from 'redis';
const client = createClient({
    host: 'redis-server',
    port: 6379
});

client.on('error', err => console.log('Redis Client Error', err));

export async function redisSetter(data) {
    const {currencyRates, crossCourses} = data;

    await client.connect();

    await client.set('banks', JSON.stringify(currencyRates));
    await client.set('cross', JSON.stringify(crossCourses));

    // await client.set('banks', JSON.stringify(data));
    await client.set('updateDate', JSON.stringify({updateDate: new Date().toLocaleString()}));

    await client.disconnect();

    console.log('Data is set!')
}

export async function redisGetter() {
    await client.connect();

    const banks = await client.get('banks');
    const cross = await client.get('cross');
    const updateDate = await client.get('updateDate');
    
    await client.disconnect();

    return {banks, cross, updateDate};
}