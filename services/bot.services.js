import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

const cloud_bot = new TelegramBot(process.env.TOKEN_TELEGRAM_BOT, {
    polling:true
});

cloud_bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    cloud_bot.sendMessage(chatId, text);
})