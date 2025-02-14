const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: `What city is known as the "Eternal City"?`,
        answers: [
            { text: "Rome", correct: true },
            { text: "Athens", correct: false },
            { text: "Babylon", correct: false },
            { text: "Jerusalem", correct: false },
        ]
    },
    {
        question: "Which year did World War II end?",
        answers: [
            { text: "1946", correct: false },
            { text: "1943", correct: false },
            { text: "1945", correct: true },
            { text: "1942", correct: false },
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Mississippi", correct: false },
            { text: "Nile", correct: true },
            { text: "Congo", correct: false },
            { text: "Euphrates", correct: false },
        ]
    }
];

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const progressBar = document.getElementById("progress-bar");  

let selectedQuestions = [];
let currentQuestionIndex = 0;
let questionCount = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Function to select 5 unique random questions
const selectRandomQuestions = () => {
    let shuffled = [...questions].sort(() => Math.random() - 0.5);
    selectedQuestions = shuffled.slice(0, 5);
};

// Function to start the timer and progress bar
const startTimer = () => {
    timeLeft = 15;
    progressBar.style.width = "100%"; // Reset progress bar

    let interval = 1000; // 1 second
    let decrement = 100 / 15; // Decrease width by this percentage per second

    timer = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${timeLeft * decrement}%`;

        if (timeLeft === 0) {
            clearInterval(timer);
            disableAnswers();
            progressBar.style.width = "0%";  
            nextBtn.style.display = "block";
        }
    }, interval);
};

// Function to disable answer buttons when time runs out
const disableAnswers = () => {
    Array.from(answerBtn.children).forEach(button => {
        button.disabled = true;
    });
};

const startQuiz = () => {
    selectRandomQuestions();
    currentQuestionIndex = 0;
    questionCount = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
};

const showQuestion = () => {
    resetState();

    if (questionCount >= 5) {
        showScore();
        return;
    }

    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = questionCount + 1;
    questionEl.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    progressBar.style.display = "block";  
    startTimer();
};

const resetState = () => {
    nextBtn.style.display = "none";
    progressBar.style.width = "100%";  
    progressBar.style.display = "block"; 

    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }

    clearInterval(timer);
};

const selectAnswer = (e) => {
    clearInterval(timer);
    progressBar.style.display = "none"; 
    nextBtn.style.display = "block"; 

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
};

const showScore = () => {
    resetState();
    questionEl.innerHTML = `You scored ${score} out of 5`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
};

nextBtn.addEventListener("click", () => {
    if (questionCount < 5) {
        currentQuestionIndex++;
        questionCount++;
        showQuestion();
    } else {
        startQuiz();
    }
});

startBtn.addEventListener("click", () => {
    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".app").style.display = "block";
    startQuiz();
});
