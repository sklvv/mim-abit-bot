import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

import { getAvaliableStudy } from "../helpers/getAvaliableStudy.js";

import { checkForPassedExam } from "../helpers/checkForPassedExam.js";

export const checkFieldStudyScene = new VkBotScene(
  "checkFieldStudy",
  async (ctx) => {
    ctx.scene.next();

    ctx.session.finalSubjects = checkForPassedExam(ctx.session.pointsArr);

    const avaliableStudy = getAvaliableStudy(ctx.session.finalSubjects);

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
        "Вы проходите к нам на контрактную форму обучения! Нажмите на интересующее направление чтобы узнать о нем побольше!",
        null,
        VkBotMarkup.keyboard([
          [VkBotMarkup.button("Перейти к заполнению документов", "primary")],
          [
            VkBotMarkup.button(
              "Контакты и график приемной комиссии",
              "secondary"
            ),
          ],
          [VkBotMarkup.button("В начало", "negative")],
        ])
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
    switch (ctx.message.text) {
      case "В начало":
        ctx.scene.leave();
        break;
      case "Контакты и график приемной комиссии":
        await ctx.reply("инфа о приемной комиссии");
        // TODO
        break;

      case "Перейти к заполнению документов":
        await ctx.reply("заполнить данные для заключения договора на обучение");
        ctx.scene.next();
        break;

      default:
        ctx.reply(`Рассказ про ${ctx.message.text}
        <............>
        Для вас стоимость обучения за 2023-2024 учебный год составит <....> рублей
        `);
        // TODO

        break;
    }
  },
  // fillingDocsProcess
  async (ctx) => {
    switch (ctx.message.text) {
      case "В начало":
        ctx.scene.leave();
        break;

      default:
        ctx.reply(`Рассказ про ${ctx.message.text}
        <............>
        Для вас стоимость обучения за 2023-2024 учебный год составит <....> рублей
        `);
        // TODO

        break;
    }
  }
);
