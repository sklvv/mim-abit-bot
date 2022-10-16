import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

export const enterPointsScene = new VkBotScene(
  "enterPoints",
  async (ctx) => {
    ctx.scene.next();
    await ctx.reply(
      "Переходим к вводу баллов",
      null,
      VkBotMarkup.keyboard([
        VkBotMarkup.button("В начало", "negative"),
      ]).oneTime(true)
    );
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
      await ctx.reply("Давай посмотрим куда ты сможешь поступить!");
      await ctx.scene.enter("checkFieldStudy");
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

    await ctx.reply("Давай посмотрим куда ты сможешь поступить!");

    await ctx.scene.enter("checkFieldStudy");
  }
);
