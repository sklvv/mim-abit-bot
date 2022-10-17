import { getStudyCost } from "./getStudyCost.js";

export const getStudyDescription = (
  currentStudyName,
  currentStudyProfiles,
  currentStudyCost,
  abitSubjetcsArr
) => {
  let str = ``;
  str += `🔹Направление "${currentStudyName}"
  `;
  currentStudyProfiles.forEach((curStudy) => {
    str += `- профиль ${curStudy.profile} ${curStudy.link}
    `;
  });
  str += `
  Для вас стоимость обучения на 2023-2024 год составит ${getStudyCost(
    currentStudyName,
    abitSubjetcsArr
  )} рублей.`;
  return str;
};
