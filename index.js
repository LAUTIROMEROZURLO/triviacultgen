const startGameButton = document.getElementById('start-game');
const gameArea = document.getElementById('game-area');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const feedbackMessageElement = document.getElementById('feedback-message');
const nextQuestionButton = document.getElementById('next-question');

let questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        answers: ["Berlín", "Madrid", "París", "Lisboa"],
        correctAnswer: "París"
    },
    {
        question: "¿Quién escribió 'Don Quijote de la Mancha'?",
        answers: ["Miguel de Cervantes", "Gabriel García Márquez", "Pablo Neruda", "Jorge Luis Borges"],
        correctAnswer: "Miguel de Cervantes"
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: ["Nilo", "Amazonas", "Misisipi", "Yangtsé"],
        correctAnswer: "Amazonas"
    },
    {
        question: "¿En qué año llegó el hombre a la Luna?",
        answers: ["1965", "1969", "1972", "1980"],
        correctAnswer: "1969"
    },
    {
        question: "¿Cuál es el país más grande del mundo por área?",
        answers: ["Estados Unidos", "China", "Rusia", "Canadá"],
        correctAnswer: "Rusia"
    },
    {
        question: "¿Cuál es el idioma más hablado en el mundo?",
        answers: ["Español", "Inglés", "Chino mandarín", "Hindú"],
        correctAnswer: "Chino mandarín"
    },
    {
        question: "¿Cuál es la montaña más alta del mundo?",
        answers: ["K2", "Kangchenjunga", "Everest", "Makalu"],
        correctAnswer: "Everest"
    },
    {
        question: "¿Cuál es el animal terrestre más rápido?",
        answers: ["Leopardo", "Guepardo", "León", "Tigre"],
        correctAnswer: "Guepardo"
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "¿Cuál es el océano más grande del mundo?",
        answers: ["Atlántico", "Pacífico", "Índico", "Ártico"],
        correctAnswer: "Pacífico"
    },
    {
        question: "¿Quién escribió 'Cien años de soledad'?",
        answers: ["Mario Vargas Llosa", "Gabriel García Márquez", "Isabel Allende", "Jorge Luis Borges"],
        correctAnswer: "Gabriel García Márquez"
    },
    {
        question: "¿Cuál es el elemento químico más abundante en el universo?",
        answers: ["Oxígeno", "Hidrógeno", "Carbono", "Nitrógeno"],
        correctAnswer: "Hidrógeno"
    },
    {
        question: "¿En qué continente se encuentra Egipto?",
        answers: ["Asia", "África", "Europa", "América"],
        correctAnswer: "África"
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: ["Tierra", "Saturno", "Marte", "Júpiter"],
        correctAnswer: "Júpiter"
    },
    {
        question: "¿Quién fue el primer presidente de los Estados Unidos?",
        answers: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
        correctAnswer: "George Washington"
    },
    {
        question: "¿Cuál es la capital de Japón?",
        answers: ["Pekín", "Seúl", "Tokio", "Bangkok"],
        correctAnswer: "Tokio"
    },
    {
        question: "¿Qué gas es esencial para la respiración humana?",
        answers: ["Dióxido de carbono", "Oxígeno", "Nitrógeno", "Hidrógeno"],
        correctAnswer: "Oxígeno"
    },
    {
        question: "¿En qué país se encuentran las pirámides de Giza?",
        answers: ["México", "Perú", "Egipto", "China"],
        correctAnswer: "Egipto"
    },
    {
        question: "¿Cuál es la obra más famosa de Shakespeare?",
        answers: ["Macbeth", "Romeo y Julieta", "Hamlet", "Otelo"],
        correctAnswer: "Romeo y Julieta"
    },
    {
        question: "¿Qué animal es conocido como el 'rey de la selva'?",
        answers: ["Elefante", "Tigre", "León", "Gorila"],
        correctAnswer: "León"
    },
    {
        question: "¿Cuál es la capital de Australia?",
        answers: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra"
    },
    {
        question: "¿En qué país se encuentra la Torre Eiffel?",
        answers: ["Italia", "España", "Francia", "Alemania"],
        correctAnswer: "Francia"
    },
    {
        question: "¿Qué órgano del cuerpo humano bombea sangre?",
        answers: ["Pulmones", "Hígado", "Cerebro", "Corazón"],
        correctAnswer: "Corazón"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

startGameButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username.trim()) {
        document.getElementById('start-area').style.display = 'none';
        gameArea.style.display = 'block';
        showQuestion();
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    feedbackElement.style.display = 'none';
    nextQuestionButton.style.display = 'block';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(button, answer));
        answersElement.appendChild(button);
    });
}

function selectAnswer(button, answer) {
    const buttons = answersElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    button.classList.add('selected');
    selectedAnswer = answer;
}

nextQuestionButton.addEventListener('click', () => {
    if (selectedAnswer === null) {
        alert('Por favor, selecciona una respuesta antes de continuar.');
        return;
    }

    validateAnswer();

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        selectedAnswer = null; 
    } else {
        endGame();
    }
});

function validateAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score += 10;
        feedbackMessageElement.textContent = '¡Correcto!';
    } else {
        feedbackMessageElement.textContent = `Incorrecto. La respuesta correcta es: ${currentQuestion.correctAnswer}`;
    }
    scoreElement.textContent = score;
    feedbackElement.style.display = 'block';
}

function getRanking(score) {
    if (score >= 90) return 'Genio';
    if (score >= 70) return 'Muy Inteligente';
    if (score >= 50) return 'Inteligente';
    if (score >= 30) return 'Promedio';
    return 'Necesitas Mejorar';
}

function endGame() {
    const ranking = getRanking(score);
    questionElement.textContent = '¡Juego terminado!';
    answersElement.innerHTML = `Tu puntaje final es: ${score}.<br>Clasificación: ${ranking}`;
    feedbackElement.style.display = 'none';
    nextQuestionButton.style.display = 'none';
}
