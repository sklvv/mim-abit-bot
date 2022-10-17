import { areasOfStudy } from "../data.js";

export const getStudyCost = (studyName, abitPointsArr) => {
  let abitPoints = 0;
  abitPointsArr.forEach((subject) => {
    abitPoints += Number(subject.points);
  });
  let areaOfStudy;
  areasOfStudy.some((study) => {
    if (study.name === studyName) {
      areaOfStudy = study;
    }
  });
  if (abitPoints >= areaOfStudy.salesArr[0]) {
    return areaOfStudy.cost20;
  }
  if (abitPoints >= areaOfStudy.salesArr[1]) {
    return areaOfStudy.cost15;
  }
  if (abitPoints >= areaOfStudy.salesArr[2]) {
    return areaOfStudy.cost10;
  }
  return areaOfStudy.cost;
};
