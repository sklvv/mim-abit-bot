import * as dotenv from "dotenv";
import VkBot from "node-vk-bot-api";
import VkBotSession from "node-vk-bot-api/lib/session.js";
import VkBotStage from "node-vk-bot-api/lib/stage.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

import { checkFieldStudyScene } from "./scenes/checkFieldStudyScene.js";
import { enterPointsScene } from "./scenes/enterPointsScene.js";
import { greetScene } from "./scenes/greetScene.js";
import { getContractScene } from "./scenes/getContractScene.js";

dotenv.config();

const token = process.env.VK_BOT_API_KEY;
const bot = new VkBot(token);

const session = new VkBotSession();
const stage = new VkBotStage(
  greetScene,
  enterPointsScene,
  checkFieldStudyScene,
  getContractScene
);
bot.use(session.middleware());
bot.use(stage.middleware());

bot.command(["Начать", "В начало"], async (ctx) => {
  await ctx.scene.enter("greet");
});

bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});

bot.on((ctx) => {
  ctx.reply(
    "Что-то пошло не так, нажми кнопку В начало, и начни сначала",
    null,
    VkBotMarkup.keyboard([VkBotMarkup.button("В начало", "negative")]).oneTime(
      true
    )
  );
});
