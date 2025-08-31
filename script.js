const quizData = [
  // General Knowledge
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Earth", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Leo Tolstoy"],
    answer: "William Shakespeare"
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "In which country is the Great Pyramid of Giza located?",
    options: ["Egypt", "Mexico", "India", "China"],
    answer: "Egypt"
  },

  // Programming
  {
    question: "Which language is known as the backbone of web development?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/* */", "<!-- -->"],
    answer: "#"
  },
  {
    question: "Which company developed Java?",
    options: ["Microsoft", "Oracle", "Sun Microsystems", "IBM"],
    answer: "Sun Microsystems"
  },
  {
    question: "Which of these is not a programming language?",
    options: ["Ruby", "HTML", "C", "Swift"],
    answer: "HTML"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const replayBtn = document.getElementById("replay-btn");
const quitBtn = document.getElementById("quit-btn");

function loadQuestion() {
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectAnswer(button, q.answer));
      optionsEl.appendChild(button);
    });

    resultEl.textContent = "";
  } else {
    showFinalScore();
  }
}

function selectAnswer(button, correctAnswer) {
  const selected = button.textContent;
  const optionButtons = document.querySelectorAll(".option-btn");

  if (selected === correctAnswer) {
    button.classList.add("correct");
    score++;
    blastConfetti();
  } else {
    button.classList.add("wrong");
    // Highlight the correct one
    optionButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  optionButtons.forEach(btn => (btn.disabled = true));

  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1500);
}

function blastConfetti() {
  confetti({
    particleCount: 300,
    spread: 120,
    startVelocity: 60,
    origin: { y: 0.6 }
  });

  let duration = 1.5 * 1000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 12,
      startVelocity: 40,
      spread: 100,
      ticks: 200,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function showFinalScore() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  resultEl.style.display = "none";
  endScreen.style.display = "block";
  finalScoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
}

replayBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  questionEl.style.display = "block";
  optionsEl.style.display = "grid";
  resultEl.style.display = "block";
  endScreen.style.display = "none";
  loadQuestion();
});

quitBtn.addEventListener("click", () => {
  window.close(); // works in some browsers
  alert("Thanks for playing!");
});

loadQuestion();
