export const getStudyDescription = (
  currentStudyName,
  currentStudyProfiles,
  currentStudyCost
) => {
  let str = ``;
  str += `🔹Направление "${currentStudyName}"
  `;
  currentStudyProfiles.forEach((curStudy) => {
    str += `- профиль ${curStudy.profile} ${curStudy.link}
    `;
  });
  str += `
  Для вас стоимость обучения на 2023-2024 год составит ${currentStudyCost} рублей.`;
  return str;
  // get study cost TODO
};
