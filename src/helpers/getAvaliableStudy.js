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

const abit1 = [
  { subjectName: "Русский Язык", points: "100" },
  { subjectName: "Математика (Профиль)", points: "68" },
  { subjectName: "История", points: "79" },
];

const abit2 = [
  { subjectName: "Иностранный язык", points: "100" },
  { subjectName: "Русский Язык", points: "68" },
  { subjectName: "Обществознание", points: "79" },
];

const abit3 = [
  { subjectName: "Русский Язык", points: "100" },
  { subjectName: "Математика (Профиль)", points: "68" },
  { subjectName: "История", points: "79" },
];
