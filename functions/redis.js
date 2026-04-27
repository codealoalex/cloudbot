import { createClient } from "redis";
import "dotenv/config";

const CLIENT_PARAM = {
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_HOST_PORT,
  },
};

const client = await createClient(CLIENT_PARAM);
await client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

export async function getKey(key, field) {
  return await client.hGet(`user:${key}`, field);
}

export async function setKey(key, field, value) {
  await client.hSet(`user:${key}`, field, value);
  await client.expire(`user:${key}`, 60);
}

export async function delKey(key) {
  await client.del(`user:${key}`);
}
