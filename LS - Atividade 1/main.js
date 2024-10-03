import  ExamSystem  from './exams.js';





// Cria um sistema de provas

let examSystem = new ExamSystem();

// Adiciona uma matéria ao sistema
examSystem.addSubject('Matemática');

// Adiciona as questões para Matemática
let questionsMath = [
    { answer: 'a', weight: 2 },
    { answer: 'b', weight: 2 },
    { answer: 'a', weight: 2 },
    { answer: 'c', weight: 2 },
    { answer: 'd', weight: 2 },
    { answer: 'b', weight: 2 },
    { answer: 'c', weight: 2 },
    { answer: 'd', weight: 2 },
    { answer: 'a', weight: 2 },
    { answer: 'b', weight: 2 }
];
examSystem.getSubject('Matemática').addQuestions(questionsMath);

// Função para gerar um nome aleatório
function generateRandomName() {
    const firstNames = ['João', 'Maria', 'Ana', 'Carlos', 'Pedro', 'Juliana', 'Lucas', 'Rafaela', 'Mariana', 'Fernanda'];
    const lastNames = ['Silva', 'Souza', 'Oliveira', 'Santos', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Martins', 'Carvalho'];
    const usedNames = new Set();

    let name;
    do {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        name = `${firstName} ${lastName}`;
    } while (usedNames.has(name));

    usedNames.add(name);
    return name;
}

// Função para gerar respostas aleatórias
function generateRandomAnswers() {
    const answers = ['a', 'b', 'c', 'd'];
    return Array.from({ length: 10 }, () => answers[Math.floor(Math.random() * answers.length)]);
}

// Gera 10 alunos com respostas aleatórias
let students = Array.from({ length: 10 }, () => ({
    name: generateRandomName(),
    answers: generateRandomAnswers()
}));
// Submete as respostas de cada aluno
students.forEach(student => {
    examSystem.getSubject('Matemática').submitAnswers(student.name, student.answers);
});

// Calcula e exibe as estatísticas gerais dos alunos
let subject = examSystem.getSubject('Matemática');
let avgAll = subject.avgAll();
let minGrade = subject.minGrades();
let maxGrade = subject.maxGrades();
let lt = subject.lt(5); // Notas menores que 5
let gt = subject.gt(8); // Notas maiores que 8

console.log("\nResultados Gerais:");
console.log("=====================");
console.log(`Média geral das notas: ${avgAll.toFixed(2)}`);
console.log("---------------------");
console.log(`Menor nota: ${minGrade.student} com ${minGrade.grade.toFixed(2)}`);
console.log("---------------------");
console.log(`Maior nota: ${maxGrade.student} com ${maxGrade.grade.toFixed(2)}`);
console.log("---------------------");
console.log("Notas menores que 5:");
lt.forEach(result => {
    console.log(`- ${result.studentName} com ${result.grade.toFixed(2)}`);
});
console.log("---------------------");
console.log("Notas maiores que 8:");
gt.forEach(result => {
    console.log(`- ${result.studentName} com ${result.grade.toFixed(2)}`);
});
console.log("=====================");
