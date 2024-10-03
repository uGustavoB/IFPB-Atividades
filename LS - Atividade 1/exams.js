class Subject {
    constructor(name) {
        this.name = name;        // Nome da matéria
        this.exams = [];         // Lista de questões
        this.studentResults = {}; // Armazena os resultados dos alunos
    }

    // Adiciona um array de 10 questões
    addQuestions(questionsArray) {
        try {
            if (questionsArray.length !== 10) {
                console.log("A prova precisa conter exatamente 10 questões.");
                return;
            }
            this.exams = questionsArray;
        } catch (error) {
            console.error("Erro ao adicionar questões:", error);
        }
    }

    submitAnswers(studentName, studentAnswers) {
        try {
            if (studentAnswers.length !== 10) {
                console.log("O aluno precisa responder exatamente 10 questões.");
                return;
            }

            let totalWeight = 0;
            let correctWeight = 0;

            for (let i = 0; i < this.exams.length; i++) {
                const { answer, weight } = this.exams[i];
                totalWeight += weight;

                if (studentAnswers[i] === answer) {
                    correctWeight += weight;
                }
            }

            const grade = (correctWeight / totalWeight) * 10; // Nota de 0 a 10

            this.studentResults[studentName] = {
                answers: studentAnswers,
                grade: grade
            };

            console.log(`Aluno: ${studentName}`);
            console.log(`Matéria: ${this.name}`);
            console.log(`Nota: ${grade.toFixed(2)}`);
            console.log('---------------------');
            return grade;
        } catch (error) {
            console.error("Erro ao submeter respostas:", error);
        }
    }

    avg(studentName) {
        try {
            if (this.studentResults[studentName]) {
                return this.studentResults[studentName].grade;
            } else {
                console.log(`Aluno ${studentName} não encontrado na matéria ${this.name}.`);
                return null;
            }
        } catch (error) {
            console.error("Erro ao calcular a média do aluno:", error);
            return null;
        }
    }

    getAllGrades() {
        try {
            return Object.values(this.studentResults).map(result => result.grade);
        } catch (error) {
            console.error("Erro ao obter todas as notas:", error);
            return [];
        }
    }

    avgAll() {
        try {
            const grades = this.getAllGrades();
            const total = grades.reduce((sum, grade) => sum + grade, 0);
            return total / grades.length;
        } catch (error) {
            console.error("Erro ao calcular a média geral das notas:", error);
            return null;
        }
    }

    minGrades() {
        try {
            const minGrade = Math.min(...this.getAllGrades());
            const student = Object.keys(this.studentResults).find(studentName => this.studentResults[studentName].grade === minGrade);

            return { student, grade: minGrade };
        } catch (error) {
            console.error("Erro ao obter a menor nota:", error);
            return null;
        }
    }

    maxGrades() {
        try {
            const maxGrade = Math.max(...this.getAllGrades());
            const student = Object.keys(this.studentResults).find(studentName => this.studentResults[studentName].grade === maxGrade);

            return { student, grade: maxGrade };
        } catch (error) {
            console.error("Erro ao obter a maior nota:", error);
            return null;
        }
    }

    lt(limit) {
        try {
            const results = Object.entries(this.studentResults)
                .filter(([_, result]) => result.grade < limit)
                .map(([studentName, result]) => ({ studentName, grade: result.grade }));
            return results;
        } catch (error) {
            console.error("Erro ao obter notas menores que o limite:", error);
            return [];
        }
    }

    gt(limit) {
        try {
            const results = Object.entries(this.studentResults)
                .filter(([_, result]) => result.grade > limit)
                .map(([studentName, result]) => ({ studentName, grade: result.grade }));
            return results;
        } catch (error) {
            console.error("Erro ao obter notas maiores que o limite:", error);
            return [];
        }
    }
}

export default class ExamSystem {
    constructor() {
        this.subjects = {}; // Armazena as matérias
    }

    // Adiciona uma matéria ao sistema
    addSubject(subjectName) {
        try {
            if (this.subjects[subjectName]) {
                console.log(`A matéria ${subjectName} já existe.`);
                return;
            }
            this.subjects[subjectName] = new Subject(subjectName);
        } catch (error) {
            console.error(`Erro ao adicionar a matéria ${subjectName}:`, error);
        }
    }

    // Retorna a matéria pelo nome
    getSubject(subjectName) {
        try {
            if (!this.subjects[subjectName]) {
                console.log(`A matéria ${subjectName} não foi encontrada.`);
                return null;
            }
            return this.subjects[subjectName];
        } catch (error) {
            console.error(`Erro ao obter a matéria ${subjectName}:`, error);
            return null;
        }
    }

    // Lista todas as matérias no sistema
    listSubjects() {
        try {
            return Object.keys(this.subjects);
        } catch (error) {
            console.error('Erro ao listar as matérias:', error);
            return [];
        }
    }
}

// Exemplo de uso:

