import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { MESSAGES } from "./informacion/mensajes.js";

import { delKey, getKey, setKey } from "./functions/redis.js";

const cloud_bot = new TelegramBot(process.env.TOKEN_TELEGRAM_BOT, {
  polling: true,
  request: {
    agentOptions: {
      keepAlive: true,
      family: 4
    }
  }
});

cloud_bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  let message = await getKey(chatId, "last-message");
  const step1 = await getKey(chatId, "step1");
  const step2 = await getKey(chatId, "step2");
  const step3 = await getKey(chatId, "step3");

  if (!step1) {
    await setKey(chatId, "step1", "success");
    await setKey(chatId, "last-message", MESSAGES.text);
    message = await getKey(chatId, "last-message");
    return cloud_bot.sendMessage(chatId, message);
  }

  if (!step2 && !isNaN(parseInt(text))) {
    await setKey(chatId, "step2", text);
    await setKey(
      chatId,
      "last-message",
      MESSAGES["opciones"][parseInt(text) - 1]["info"]["text"],
    );
    message = await getKey(chatId, "last-message");
    return cloud_bot.sendMessage(chatId, message);
  }

  if (!step3 && !isNaN(parseInt(text))) {
    await setKey(
      chatId,
      "last-message",
      MESSAGES["opciones"][parseInt(step2) - 1]["info"]["opciones"][
        parseInt(text) - 1
      ]["text"],
    );
    message = await getKey(chatId, "last-message");

    if (
      !MESSAGES["opciones"][parseInt(step2) - 1]["info"]["opciones"][
        parseInt(text) - 1
      ]["opciones"]
    ) {
      await delKey(chatId);
    }
    return cloud_bot.sendMessage(chatId, message);
  }
});