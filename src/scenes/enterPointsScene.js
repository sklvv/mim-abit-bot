import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";
import { examSubjects } from "../data.js";

export const enterPointsScene = new VkBotScene(
  "enterPoints",
  async (ctx) => {
    ctx.scene.next();

    await ctx.reply(
      `Ты выбрал ${ctx.session.subjectsArr.length} предмета. Начнем с ${ctx.session.subjectsArr[0]}:`
    );
  },
  async (ctx) => {
    ctx.session.pointsArr = [
      { subjectName: ctx.session.subjectsArr[0], points: ctx.message.text },
    ];

    ctx.scene.next();

    await ctx.reply(`Отлично! Теперь ${ctx.session.subjectsArr[1]}:`);
  },
  async (ctx) => {
    ctx.session.pointsArr.push({
      subjectName: ctx.session.subjectsArr[1],
      points: ctx.message.text,
    });

    ctx.scene.next();

    await ctx.reply(`Отлично! Теперь ${ctx.session.subjectsArr[2]}:`);
  },
  async (ctx) => {
    ctx.session.pointsArr.push({
      subjectName: ctx.session.subjectsArr[2],
      points: ctx.message.text,
    });

    if (ctx.session.subjectsArr.length === 3) {
      ctx.scene.leave();

      await ctx.reply(
        "Давай посмотри куда ты сможешь поступить!",
        null,
        VkBotMarkup.keyboard([
          VkBotMarkup.button("Вперед!", "primary"),
          VkBotMarkup.button("В начало", "negative"),
        ]).oneTime(true)
      );
    } else {
      ctx.scene.next();
      await ctx.reply(`И наконец ${ctx.session.subjectsArr[3]}:`);
    }
  },
  async (ctx) => {
    ctx.session.pointsArr.push({
      subjectName: ctx.session.subjectsArr[3],
      points: ctx.message.text,
    });

    ctx.scene.leave();

    await ctx.reply(
      "Давай посмотри куда ты сможешь поступить!",
      null,
      VkBotMarkup.keyboard([
        VkBotMarkup.button("Вперед!", "primary"),
        VkBotMarkup.button("В начало", "negative"),
      ]).oneTime(true)
    );
  }
);
