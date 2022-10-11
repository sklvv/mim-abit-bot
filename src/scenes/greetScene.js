import VkBotScene from "node-vk-bot-api/lib/scene.js";
import VkBotMarkup from "node-vk-bot-api/lib/markup.js";
import { examSubjects } from "../data.js";

export const greetScene = new VkBotScene(
  "greet",
  (ctx) => {
    ctx.scene.next();
    ctx.reply(
      "Приветсвую тебя, уважаемый абитуриент! Хочешь узнать, проходишь ты на контрактное(платное) обучение?",
      null,
      VkBotMarkup.keyboard(
        examSubjects.map((subject) => subject.subject),
        { columns: 3 }
      ).inline()
    );
    ctx.reply(
      "Выбери предметы ЕГЭ или вступительные экзамены, которые ты сдавал"
    );
  },
  (ctx) => {
    ctx.session.subjectsArr = [ctx.message.text];

    ctx.scene.next();
  },
  (ctx) => {
    ctx.session.subjectsArr.push(ctx.message.text);

    ctx.scene.next();
  },
  (ctx) => {
    ctx.session.subjectsArr.push(ctx.message.text);

    ctx.reply(
      "Если это все, то нажми кнопку продолжить!",
      null,
      VkBotMarkup.keyboard([
        VkBotMarkup.button("Продолжить", "primary"),
      ]).oneTime(true)
    );
    ctx.scene.next();
  },
  (ctx) => {
    if (ctx.message.text !== "Продолжить") {
      ctx.session.subjectsArr.push(ctx.message.text);

      ctx.scene.leave();
    } else {
      ctx.scene.leave();
    }
    ctx.reply(
      "Переходим к вводу баллов",
      null,
      VkBotMarkup.keyboard([
        VkBotMarkup.button("Ввести баллы", "primary"),
        VkBotMarkup.button("В начало", "negative"),
      ]).oneTime(true)
    );
  }
);
