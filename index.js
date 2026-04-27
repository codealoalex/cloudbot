import dns from 'node:dns'

import "dotenv/config";
import express from 'express';

import TelegramBot from "node-telegram-bot-api";
import { MESSAGES } from "./informacion/mensajes.js";
import { delKey, getKey, setKey } from "./functions/redis.js";
import { getValues, getState } from "./functions/getState.js";

dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT;
app.listen(PORT,()=>{
  console.log("Servidor corriendo en el puerto:",PORT);
})
const cloud_bot = new TelegramBot(process.env.TOKEN_TELEGRAM_BOT, {
  polling: true,
  request: {
    agentOptions: {
      keepAlive: true,
      family: 4,
    },
  },
});

let res, arr_param;

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
    return cloud_bot.sendMessage(
      chatId,
      `${message}\n\nDigite el número de una de las opciones o escriba la opción.`,
    );
  }

  if (!step2) {
    res = parseInt(text);
    if (isNaN(parseInt(text))) {
      arr_param = getValues(step1);
      res = getState(text, arr_param);
    }
    if (res < 0 || res > 3) {
      delKey(chatId);
      return cloud_bot.sendMessage(
        chatId,
        "Opción incorrecta, escriba cualquier caracter para ver nuevamente las opciones",
      );
    }
    await setKey(chatId, "step2", res);
    await setKey(
      chatId,
      "last-message",
      MESSAGES["opciones"][res - 1]["info"]["text"],
    );
    message = await getKey(chatId, "last-message");
    return cloud_bot.sendMessage(
      chatId,
      `${message}\n\nDigite el número de una de las opciones o escriba la opción.`,
    );
  }

  if (!step3) {
    res = parseInt(text);
    if (isNaN(parseInt(text))) {
      arr_param = getValues(step2);
      res = getState(text, arr_param);
    }
    if (res < 0) {
      delKey(chatId);
      return cloud_bot.sendMessage(
        chatId,
        "Opción incorrecta, escriba cualquier caracter para ver nuevamente las opciones",
      );
    }
    await setKey(
      chatId,
      "last-message",
      MESSAGES["opciones"][parseInt(step2) - 1]["info"]["opciones"][res - 1][
        "text"
      ],
    );
    message = await getKey(chatId, "last-message");

    if (
      !MESSAGES["opciones"][parseInt(step2) - 1]["info"]["opciones"][res - 1][
        "opciones"
      ]
    ) {
      await delKey(chatId);
    }
    return cloud_bot.sendMessage(
      chatId,
      `${message}\n\nSí desea otro tipo de información, escriba cualquier caracter`,
    );
  }
});

// Manejo de errores

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

cloud_bot.on("polling_error", (err) => console.log("Error de Polling:", err.message));
