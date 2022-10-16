import { areasOfStudy } from "../data.js";

export const getAvaliableStudy = (examsArr) => {
  const result = [];
  areasOfStudy.forEach((areaOfStudy) => {
    let counter = 0;
    areaOfStudy.examsArr.forEach((examInArea) => {
      examsArr.forEach((examAbit) => {
        examInArea === examAbit.subjectName && counter++;
      });
    });
    counter >= 3 && result.push(areaOfStudy);
  });
  return result;
};
