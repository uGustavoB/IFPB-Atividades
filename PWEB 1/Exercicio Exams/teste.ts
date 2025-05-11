import { Answer } from "./Answer";
import { Weight } from "./Weight";
import { Exam } from "./Exam";

const weights = new Weight({
  q1: { a: 2, b: 0, c: 0, d: 0 },
  q2: { a: 0, b: 2, c: 0, d: 0 },
  q3: { a: 2, b: 0, c: 0, d: 0 },
  q4: { a: 0, b: 0, c: 2, d: 0 },
  q5: { a: 0, b: 0, c: 0, d: 2 },
});

const mainAnswer = new Answer({
  q1: 'a',
  q2: 'b',
  q3: 'a',
  q4: 'c',
  q5: 'd'
});

const exam = new Exam(mainAnswer, weights);

exam.add(new Answer({
  q1: 'a',
  q2: 'b',
  q3: 'c',
  q4: 'a',
  q5: 'd'
}));

exam.add(new Answer({
  q1: 'a',
  q2: 'b',
  q3: 'b',
  q4: 'c',
  q5: 'a'
}));

exam.add(new Answer({
  q1: 'a',
  q2: 'b',
  q3: 'a',
  q4: 'a',
  q5: 'd'
}));

exam.add(new Answer({
  q1: 'a',
  q2: 'b',
  q3: 'a',
  q4: 'c',
  q5: 'a'
}));

console.log("Média:", exam.avg());
console.log("Mínimo:", exam.min());
console.log("Máximo:", exam.max());
console.log("Menores que 6:", exam.lt(6).length);
console.log("Maiores que 6:", exam.gt(6).length);
