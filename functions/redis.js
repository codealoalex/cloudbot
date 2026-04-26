import { createClient } from "redis";

export async function getKey(key, field){
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    return await client.hGet(`user:${key}`, field);
}

export async function setKey(key, field, value){
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.hSet(`user:${key}`, field, value);
    await client.expire(`user:${key}`, 60);
}

export async function delKey(key){
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.del(`user:${key}`);
}