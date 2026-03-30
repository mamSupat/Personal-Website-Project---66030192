const questions = [
  {
    question: "ใครเป็นคนที่ชอบสีฟ้าและชอบถ่ายรูป?",
    choices: ["Member A", "Member B", "Member C", "Member D"],
    answer: "Member A"
  },
  {
    question: "ใครมีคาแรกเตอร์เท่และเต้นเก่ง?",
    choices: ["Member B", "Member E", "Member F", "Member A"],
    answer: "Member B"
  },
  {
    question: "ใครมีบุคลิกอบอุ่นและชอบแมว?",
    choices: ["Member D", "Member C", "Member A", "Member F"],
    answer: "Member C"
  },
  {
    question: "ใครเป็นคนอารมณ์ดีและชอบของหวาน?",
    choices: ["Member E", "Member F", "Member D", "Member B"],
    answer: "Member D"
  },
  {
    question: "ใครมีพลังงานสูงและชอบกีฬา?",
    choices: ["Member C", "Member A", "Member F", "Member E"],
    answer: "Member F"
  }
];

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const quizIntro = document.getElementById("quizIntro");
const quizBox = document.getElementById("quizBox");
const quizResult = document.getElementById("quizResult");

const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");
const questionCount = document.getElementById("questionCount");
const resultText = document.getElementById("resultText");
const progressFill = document.getElementById("progressFill");

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;

  quizIntro.style.display = "none";
  quizResult.style.display = "none";
  quizBox.style.display = "block";

  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  scoreText.textContent = `Score: ${score}`;
  questionCount.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  progressFill.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;

  currentQuestion.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  feedback.textContent = "";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const selectedAnswer = button.textContent;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }

    if (btn === button && selectedAnswer !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    feedback.textContent = "Correct! เก่งมาก";
  } else {
    feedback.textContent = `Incorrect! คำตอบที่ถูกคือ ${correctAnswer}`;
  }

  scoreText.textContent = `Score: ${score}`;
  nextBtn.style.display = "inline-flex";
}

function showResult() {
  quizBox.style.display = "none";
  quizResult.style.display = "block";
  progressFill.style.width = "100%";

  let level = "";
  if (score === questions.length) {
    level = "Super Fan";
  } else if (score >= 3) {
    level = "Rising Fan";
  } else {
    level = "Beginner Fan";
  }

  resultText.textContent = `คุณได้ ${score} จาก ${questions.length} คะแนน ระดับแฟนคลับของคุณคือ ${level}`;
}

function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

if (startBtn) {
  startBtn.addEventListener("click", startGame);
}

if (nextBtn) {
  nextBtn.addEventListener("click", handleNextQuestion);
}

if (restartBtn) {
  restartBtn.addEventListener("click", startGame);
}