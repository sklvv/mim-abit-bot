import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

export const getContractScene = new VkBotScene("getContract", async (ctx) => {
  ctx.scene.next();
  await ctx.reply("get docs scene");
});
