import { Answer } from "./Answer";
import { Weight } from "./Weight";

export class Exam {
  exams: Array<Answer> = [];
  
  constructor(
    public answer: Answer,
    public weight: Weight,
  ) {
    this.exams = [];
  }


  add(exam: Answer): void {
    this.exams.push(exam);
  }

  private getScore(exam: Answer): number {
    let total = 0;
    for (const key in exam.values) {
      const alt = exam.values[key];
      total += this.weight.values[key]?.[alt] ?? 0;
    }
    return total;
  }

  avg(): number {
    const total = this.exams.reduce((acc, exam) => acc + this.getScore(exam), 0);
    return total / this.exams.length;
  }

  min(): number {
    return Math.min(...this.exams.map(e => this.getScore(e)));
  }

  max(): number {
    return Math.max(...this.exams.map(e => this.getScore(e)));
  }

  lt(limit: number): Array<Answer> {
    return this.exams.filter(exam => this.getScore(exam) < limit);
  }

  gt(limit: number): Array<Answer> {
    return this.exams.filter(exam => this.getScore(exam) >= limit);
  }
}
