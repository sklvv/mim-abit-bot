import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

import { getAvaliableStudy } from "../helpers/getAvaliableStudy.js";
import { areasOfStudy } from "../data.js";
import { checkForPassedExam } from "../helpers/checkForPassedExam.js";

export const checkFieldStudyScene = new VkBotScene(
  "checkFieldStudy",
  async (ctx) => {
    ctx.scene.next();

    ctx.session.finalSubjects = checkForPassedExam(ctx.session.pointsArr);

    const avaliableStudy = getAvaliableStudy(ctx.session.finalSubjects);
    console.log(ctx.session.finalSubjects);
    if (avaliableStudy.length >= 1) {
      await ctx.reply(
        `Тебе доступны следующие программы:`,
        null,
        VkBotMarkup.keyboard(
          avaliableStudy.map((fieldStudy) => {
            return fieldStudy.name;
          }),
          { columns: 3 }
        ).inline()
      );
      await ctx.reply(
        "Нажми на интересующее направление чтобы узнать о нем побольше!",
        null,
        VkBotMarkup.keyboard([VkBotMarkup.button("В начало", "negative")])
      );
    } else {
      await ctx.reply(
        "К сожалению тебе не доступные наши программы!",
        null,
        VkBotMarkup.keyboard([
          VkBotMarkup.button("В начало", "negative"),
        ]).oneTime(true)
      );
    }
  },
  async (ctx) => {
    console.log(ctx.message.text);
    switch (ctx.message.text) {
      case "В начало":
        ctx.scene.leave();
        break;
      case "Поступить сюда!":
        ctx.scene.leave();
        break;

      default:
        ctx.reply(`Рассказ про ${ctx.message.text}`);
        break;
    }
  }
);
