import { createClient } from "redis";

export async function getKey(key, field) {
  const client = await createClient({
    username: "default",
    password: "jUKJEdPSXtqer3rXW99Zhg9C9AW03vZ4",
    socket: {
      host: "redis-19197.c53.west-us.azure.cloud.redislabs.com",
      port: 19197,
    },
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  return await client.hGet(`user:${key}`, field);
}

export async function setKey(key, field, value) {
  const client = await createClient({
    username: "default",
    password: "jUKJEdPSXtqer3rXW99Zhg9C9AW03vZ4",
    socket: {
      host: "redis-19197.c53.west-us.azure.cloud.redislabs.com",
      port: 19197,
    },
  }).on("error", (err) => console.log("Redis Client Error", err)).connect();
  await client.hSet(`user:${key}`, field, value);
  await client.expire(`user:${key}`, 60);
}

export async function delKey(key) {
  const client = await createClient({
    username: "default",
    password: "jUKJEdPSXtqer3rXW99Zhg9C9AW03vZ4",
    socket: {
      host: "redis-19197.c53.west-us.azure.cloud.redislabs.com",
      port: 19197,
    },
  }).on("error", (err) => console.log("Redis Client Error", err)).connect();
  await client.del(`user:${key}`);
}
