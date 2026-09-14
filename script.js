/* ===================================================================
   CYBERQUIZ — script.js
   This file uses exactly the concepts you've been learning:
   - ARRAYS: the `questions` array holds all our quiz data
   - STRINGS: question text, option text, feedback messages
   - NUMBERS: currentQuestionIndex, score
   - BOOLEANS: hasAnswered (true/false state flags)
   - IF/ELSE: checking whether the selected answer is correct
   - FUNCTIONS: every piece of behaviour is wrapped in a function
   =================================================================== */

// ---------- 1. DATA: an ARRAY of question objects ----------
// Each item in the array is an object with a question (string),
// an array of options (strings), and the index (number) of the
// correct option.
const questions = [
  {
    question: "What does 'phishing' refer to in cybersecurity?",
    options: [
      "A firewall misconfiguration",
      "Tricking someone into revealing sensitive information via fake messages",
      "A type of encryption algorithm",
      "Physically stealing a hard drive"
    ],
    correctIndex: 1
  },
  {
    question: "Which of these is the STRONGEST password?",
    options: [
      "password123",
      "MyDogName",
      "Tr!8vQ#2mLp9",
      "12345678"
    ],
    correctIndex: 2
  },
  {
    question: "What does 'MFA' stand for?",
    options: [
      "Multiple File Access",
      "Multi-Factor Authentication",
      "Managed Firewall Application",
      "Malware Filtering Agent"
    ],
    correctIndex: 1
  },
  {
    question: "A 'zero-day' vulnerability is best described as:",
    options: [
      "A bug that has existed for zero days and was just created",
      "A flaw discovered and exploited before the vendor can patch it",
      "A virus that deletes itself after a day",
      "An expired security certificate"
    ],
    correctIndex: 1
  },
  {
    question: "Which practice helps protect against ransomware the most?",
    options: [
      "Using the same password everywhere",
      "Disabling antivirus for faster performance",
      "Regularly backing up data offline",
      "Clicking links from unknown senders to inspect them"
    ],
    correctIndex: 2
  }
];

// ---------- 2. STATE: NUMBERS and BOOLEANS that track progress ----------
let currentQuestionIndex = 0;   // NUMBER: which question we're on
let score = 0;                  // NUMBER: how many correct answers
let hasAnswered = false;        // BOOLEAN: has the user answered this question yet?

// ---------- 3. GRABBING ELEMENTS FROM THE PAGE ----------
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const totalQuestionsLabel = document.getElementById("total-questions-label");
const questionCounter = document.getElementById("question-counter");
const scoreTracker = document.getElementById("score-tracker");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");
const finalScoreText = document.getElementById("final-score-text");
const verdictText = document.getElementById("verdict-text");

// Show the total number of questions on the start screen
totalQuestionsLabel.textContent = questions.length;

// ---------- 4. FUNCTIONS ----------

// FUNCTION: switch which screen is visible
function showScreen(screenToShow) {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  screenToShow.classList.remove("hidden");
}

// FUNCTION: start (or restart) the quiz — resets all state
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}

// FUNCTION: load the current question onto the screen
function loadQuestion() {
  hasAnswered = false;                     // reset boolean for the new question
  feedbackText.textContent = "";
  nextBtn.classList.add("hidden");

  // Grab the current question object out of the array using its index
  const currentQuestion = questions[currentQuestionIndex];

  // STRING template literals build the display text
  questionCounter.textContent = `Report ${currentQuestionIndex + 1} / ${questions.length}`;
  scoreTracker.textContent = `Score: ${score}`;
  questionText.textContent = currentQuestion.question;

  // Clear out old option buttons before adding new ones
  optionsContainer.innerHTML = "";

  // Loop through the options ARRAY and create a button for each one
  currentQuestion.options.forEach(function (optionText, index) {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.classList.add("option-btn");

    // When clicked, check this answer against the correct index
    button.addEventListener("click", function () {
      checkAnswer(index, button);
    });

    optionsContainer.appendChild(button);
  });
}

// FUNCTION: check whether the selected option was correct
function checkAnswer(selectedIndex, selectedButton) {
  // Guard clause using a BOOLEAN: don't allow answering twice
  if (hasAnswered) {
    return;
  }
  hasAnswered = true;

  const currentQuestion = questions[currentQuestionIndex];
  const allOptionButtons = optionsContainer.querySelectorAll(".option-btn");

  // IF/ELSE: was the selected option the correct one?
  if (selectedIndex === currentQuestion.correctIndex) {
    score = score + 1;                          // NUMBER updated
    selectedButton.classList.add("correct");
    feedbackText.textContent = "CONFIRMED: Correct response logged.";
  } else {
    selectedButton.classList.add("incorrect");
    // Also highlight which one WAS correct
    allOptionButtons[currentQuestion.correctIndex].classList.add("correct");
    feedbackText.textContent = "FLAGGED: Incorrect. Correct response highlighted above.";
  }

  // Disable every option button so the user can't click again
  allOptionButtons.forEach(function (btn) {
    btn.disabled = true;
  });

  scoreTracker.textContent = `Score: ${score}`;
  nextBtn.classList.remove("hidden");
}

// FUNCTION: move to the next question, or end the quiz
function nextQuestion() {
  currentQuestionIndex = currentQuestionIndex + 1;

  // IF/ELSE: are there more questions left in the array?
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// FUNCTION: show the final results screen
function endQuiz() {
  showScreen(endScreen);
  finalScoreText.textContent = `You scored ${score} out of ${questions.length}.`;

  // IF/ELSE chain: give a different message depending on performance
  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    verdictText.textContent = "Verdict: Flawless. Cleared for field duty.";
  } else if (percentage >= 60) {
    verdictText.textContent = "Verdict: Solid instincts. Minor refresher recommended.";
  } else {
    verdictText.textContent = "Verdict: Additional security training required.";
  }
}

// ---------- 5. EVENT LISTENERS: wiring buttons to functions ----------
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
