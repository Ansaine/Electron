
const {ipcRenderer} = require('electron')
import {questions} from "./constants.js"
  
const questionHeading = document.querySelector("h2");
const answerText = document.getElementById("answer");
const buttons = Array.from(document.querySelectorAll("button"));

let currentQuestionIndex = 0;

//update score
function incrementScore(){
    ipcRenderer.send('increment-score')
}

// load the question
function loadQuestion() {
if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionHeading.textContent = `Question ${currentQuestionIndex + 1} / 3: ${currentQuestion.question}`;
    buttons.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    });
    answerText.textContent = "";
} else {
    // All questions answered
    answerText.textContent = ""
    questionHeading.textContent = "You have answered all questions! You can take a screenshot of your score and saved it to share with your friends";
    buttons.forEach((button) => (button.style.display = "none")); // Hide buttons
}
}

// handle answers
function handleAnswer(selectedOption) {
const currentQuestion = questions[currentQuestionIndex];
if (selectedOption === currentQuestion.correct) {
    answerText.textContent = "Correct!";
    incrementScore();
} else {
    answerText.textContent = `Wrong! The correct answer is ${currentQuestion.correct}.`;
}

// delay for next question
setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
}, 1000);
}

// Attach event listeners to buttons
buttons.forEach((button, index) => {
button.addEventListener("click", () => {
    const selectedOption = button.textContent[0]; // Get the letter of the selected option (A, B, C, or D)
    handleAnswer(selectedOption);
});
});

// Load the first question on page load
loadQuestion();
