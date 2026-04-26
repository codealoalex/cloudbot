import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { guardarEstado, obtenerEstadoUsuario } from "./db.js";

// Inicialización del bot
const token = process.env.TOKEN_TELEGRAM_BOT;
const bot = new TelegramBot(token, { polling: true });

console.log("🚀 Bot de Telegram en marcha...");

// Manejador del comando inicial /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Reiniciamos el estado en el JSON
  guardarEstado(chatId, { paso: 0, seleccion: null });

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🛒 Ventas", callback_data: "menu_ventas" },
          { text: "🛠 Soporte", callback_data: "menu_soporte" },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    `Hola ${msg.from.first_name}, bienvenido. ¿En qué puedo ayudarte?`,
    opts,
  );
});

// Manejador de las opciones seleccionables (Inline Buttons)
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const mensajeId = query.message.message_id;

  // Obtenemos el estado actual del usuario desde el JSON
  const estado = obtenerEstadoUsuario(chatId);

  // Lógica de flujo: NIVEL 1
  if (data === "menu_ventas") {
    guardarEstado(chatId, { paso: 1, seleccion: "ventas" });

    const opts = {
      chat_id: chatId,
      message_id: mensajeId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "💻 Software", callback_data: "prod_soft" }],
          [{ text: "🖥 Hardware", callback_data: "prod_hard" }],
          [{ text: "⬅️ Volver", callback_data: "volver_inicio" }],
        ],
      },
    };
    await bot.editMessageText(
      "Has elegido Ventas. ¿Qué tipo de producto buscas?",
      opts,
    );
  }

  if (data === "menu_soporte") {
    guardarEstado(chatId, { paso: 1, seleccion: "soporte" });
    await bot.sendMessage(
      chatId,
      "Has seleccionado Soporte. Un técnico se conectará pronto.",
    );
  }

  // Lógica de flujo: NIVEL 2
  if (data === "prod_soft") {
    // Leemos el JSON para saber qué eligió antes
    if (estado.seleccion === "ventas") {
      await bot.sendMessage(
        chatId,
        "Excelente elección. El software incluye licencia por 1 año. ✅",
      );
      guardarEstado(chatId, { paso: 2, subproducto: "software" });
    }
  }

  // Opción para volver al inicio y limpiar estado
  if (data === "volver_inicio") {
    guardarEstado(chatId, { paso: 0, seleccion: null });
    const opts = {
      chat_id: chatId,
      message_id: mensajeId,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛒 Ventas", callback_data: "menu_ventas" },
            { text: "🛠 Soporte", callback_data: "menu_soporte" },
          ],
        ],
      },
    };
    await bot.editMessageText("¿En qué puedo ayudarte ahora?", opts);
  }

  // Obligatorio para quitar el icono de carga en el botón
  bot.answerCallbackQuery(query.id);
});

// Manejo de errores global para evitar caídas
bot.on("polling_error", (error) => {
  console.error("Error de conexión:", error.code);
});
