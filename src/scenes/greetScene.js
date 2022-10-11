import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";
import { examSubjects } from "../data.js";

export const greetScene = new VkBotScene(
  "greet",
  async (ctx) => {
    ctx.scene.next();
    await ctx.reply(
      "Приветсвую тебя, уважаемый абитуриент! Хочешь узнать, проходишь ты на контрактное(платное) обучение?",
      null,
      VkBotMarkup.keyboard(
        examSubjects.map((subject) => subject.subject),
        { columns: 3 }
      ).inline()
    );
    await ctx.reply(
      "Выбери предметы ЕГЭ или вступительные экзамены, которые ты сдавал"
    );
  },
  async (ctx) => {
    ctx.session.subjectsArr = [ctx.message.text];

    ctx.scene.next();
  },
  async (ctx) => {
    ctx.session.subjectsArr.push(ctx.message.text);

    ctx.scene.next();
  },
  async (ctx) => {
    ctx.session.subjectsArr.push(ctx.message.text);

    await ctx.reply(
      "Если это все, то нажми кнопку продолжить!",
      null,
      VkBotMarkup.keyboard([
        VkBotMarkup.button("Продолжить", "primary"),
      ]).oneTime(true)
    );
    ctx.scene.next();
  },
  async (ctx) => {
    if (ctx.message.text !== "Продолжить") {
      ctx.session.subjectsArr.push(ctx.message.text);

      ctx.scene.enter("enterPoints");
    } else {
      ctx.scene.enter("enterPoints");
    }
  }
);
