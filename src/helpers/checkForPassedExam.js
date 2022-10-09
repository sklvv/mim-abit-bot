import { examSubjects } from "../data.js";
export const checkForPassedExam = (arrayPointsAndSubj) => {
  const result = [];
  arrayPointsAndSubj.forEach((subject) => {
    examSubjects.forEach((elem) => {
      if (elem.subject === subject.subjectName) {
        subject.points >= elem.minPoints && result.push(subject);
      }
    });
  });
  return result;
};
