import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { guardarEstado, leerEstados, obtenerEstadoUsuario } from "./db.js";
import { MESSAGES } from "./informacion/mensajes.js";
import { GENERAL_OPTIONS } from "./informacion/mensajes.js";


const cloud_bot = new TelegramBot(process.env.TOKEN_TELEGRAM_BOT, {
  polling: true,
});

cloud_bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  let step1 = obtenerEstadoUsuario("step1");
  let step2 = obtenerEstadoUsuario("step2");
  if (!step1) {
    const response = getState(0, text, GENERAL_OPTIONS);
    if (!response) cloud_bot.sendMessage(chatId, MESSAGES.text);
    else {
      guardarEstado("step1", response);
      step1 = obtenerEstadoUsuario("step1");
      return cloud_bot.sendMessage(chatId, MESSAGES["opciones"][step1].text);
    }
  }

  if (!step2) {
    return cloud_bot.sendMessage(chatId, MESSAGES["opciones"][step1]["opciones"][parseInt(text) - 1].text);
  }
});

function getState(step, num, arr) {
  if (step == 0) {
    if (isNaN(parseInt(num))) return undefined;
    if (num > arr.length) return undefined;
    return arr[parseInt(num) - 1].nom;
  }
}