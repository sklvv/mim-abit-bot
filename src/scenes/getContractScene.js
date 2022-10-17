import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";

import { getAvaliableStudy } from "../helpers/getAvaliableStudy.js";

export const getContractScene = new VkBotScene(
  "getContract",
  async (ctx) => {
    ctx.scene.next();
    const avaliableStudy = getAvaliableStudy(ctx.session.finalSubjects);

    await ctx.reply(
      `Выберите доступную вам программу обучения:`,
      null,
      VkBotMarkup.keyboard(
        avaliableStudy.map((fieldStudy) => {
          return fieldStudy.name;
        }),
        { columns: 3 }
      ).inline()
    );
  },
  async (ctx) => {
    ctx.session.areaOfStudy = ctx.message.text;

    ctx.scene.next();

    await ctx.reply("Введите ваше ФИО:");
  },
  async (ctx) => {
    ctx.session.studentFIO = ctx.message.text;

    ctx.scene.next();

    await ctx.reply("Введите ФИО того, кто будет оплачивать ваше обучение:");
  },
  async (ctx) => {
    ctx.session.paymentFIO = ctx.message.text;

    ctx.scene.leave();

    await ctx.reply(
      "Нажми кнопку чтобы отправить заявку оператору!",
      null,
      VkBotMarkup.keyboard([
        VkBotMarkup.button("Отправить заявление", "primary"),
      ]).inline(true)
    );
  }
);
