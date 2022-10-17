import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

import { getAvaliableStudy } from "../helpers/getAvaliableStudy.js";
import { checkForPassedExam } from "../helpers/checkForPassedExam.js";
import { areasOfStudy } from "../data.js";
import { getStudyDescription } from "../helpers/getStudyDescription.js";

export const checkFieldStudyScene = new VkBotScene(
  "checkFieldStudy",
  async (ctx) => {
    ctx.scene.next();

    ctx.session.finalSubjects = checkForPassedExam(ctx.session.pointsArr);

    const avaliableStudy = getAvaliableStudy(ctx.session.finalSubjects);

    if (avaliableStudy.length >= 1) {
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
      await ctx.reply(
        `Тебе доступны следующие направления:`,
        null,
        VkBotMarkup.keyboard(
          avaliableStudy.map((fieldStudy) => {
            return fieldStudy.name;
          }),
          { columns: 3 }
        ).inline()
      );
    } else {
      await ctx.reply(
        "К сожалению набранные баллы ниже порога прохождения на наши направления.",
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
        ctx.scene.enter("greet");
        break;
      case "Контакты и график приемной комиссии":
        await ctx.reply(`
        С 20 июня по 31 августа.
      В будние дни: с 10:00 до 18:00
      В субботу: с 10:00 до 13:00
      Воскресенье - выходной.

      Контактные данные: 
        тел. Приёмной Комиссии ГумФ: + 7 (342) 2-198-199,
        тел. Приёмной Комиссии ПНИПУ: + 7 (342) 2-198-065.
      Адрес: Комсомольский проспект, 29, ауд.171.`);

        break;

      case "Перейти к заполнению документов":
        await ctx.scene.enter("getContract");
        break;

      default:
        let currentStudyName;
        let currentStudyCost;

        const currentStudyProfiles = [];
        areasOfStudy.forEach((someStudy) => {
          if (someStudy.name === ctx.message.text) {
            currentStudyName = someStudy.name;
            currentStudyCost = someStudy.cost;
            someStudy.profiles.forEach((profile) =>
              currentStudyProfiles.push(profile)
            );
          }
        });

        await ctx.reply(
          `${getStudyDescription(
            currentStudyName,
            currentStudyProfiles,
            currentStudyCost,
            ctx.session.finalSubjects
          )}`
        );

        break;
    }
  }
);
