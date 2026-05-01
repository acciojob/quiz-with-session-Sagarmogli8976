// your JS code here.

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Load saved score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.innerText = `Your score is ${savedScore} out of 5.`;
}

// Save progress when user selects an option
function handleSelection(e) {
  if (e.target.type === "radio") {
    const name = e.target.name; // question-0
    const index = name.split("-")[1];

    userAnswers[index] = e.target.value;

    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
}

// Attach event listener (event delegation)
questionsElement.addEventListener("change", handleSelection);

// Submit quiz
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.innerText = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});


// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // FIXED
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore selection from sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceText = document.createTextNode(choice);

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();