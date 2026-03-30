const questions = [
  {
    question: "ใครมีข้อมูลว่า หัวหน้าวง?",
    choices: ["อลัน (Alan)", "ฮาร์ท (Heart)", "ไทย (Thai)", "คอปเปอร์ (Copper)"],
    answer: "อลัน (Alan)"
  },
  {
    question: "ใครมีข้อมูลว่า นักกีฬาบาสเกตบอล?",
    choices: ["เอเอ (AA)", "อลัน (Alan)", "ภีมวสุ (Peemwasu)", "เน็กซ์ (Nex)"],
    answer: "ภีมวสุ (Peemwasu)"
  },
  {
    question: "ใครมีข้อมูลว่า ฉายาบ้อกแบ้ก?",
    choices: ["มาร์คคริส (Marckris)", "จั๋งธีร์ (Jungt)", "ขุนพล (Khunpol)", "ฮาร์ท (Heart)"],
    answer: "มาร์คคริส (Marckris)"
  },
  {
    question: "ใครมีข้อมูลว่า แร็ปเปอร์ของวง?",
    choices: ["คอปเปอร์ (Copper)", "มาร์คคริส (Marckris)", "จั๋งธีร์ (Jungt)", "เอเอ (AA)"],
    answer: "จั๋งธีร์ (Jungt)"
  },
  {
    question: "ใครมีข้อมูลว่า แสดงซีรีย์แปลรักฉันด้วยใจเธอ?",
    choices: ["ขุนพล (Khunpol)", "ภูธัชชัย (Phutatchai)", "เน็กซ์ (Nex)", "จินวุค (Jinwook)"],
    answer: "ขุนพล (Khunpol)"
  },
  {
    question: "ใครมีข้อมูลว่า เด็กชายสุดที่รัก?",
    choices: ["ไทย (Thai)", "ฮาร์ท (Heart)", "ภีมวสุ (Peemwasu)", "เอเอ (AA)"],
    answer: "ฮาร์ท (Heart)"
  },
  {
    question: "ใครมีข้อมูลว่า เกาหลีที่จริงใจ?",
    choices: ["จินวุค (Jinwook)", "อลัน (Alan)", "ไทย (Thai)", "จั๋งธีร์ (Jungt)"],
    answer: "จินวุค (Jinwook)"
  },
  {
    question: "ใครมีข้อมูลว่า ฉายา 9 นาฬิกา?",
    choices: ["ไทย (Thai)", "คอปเปอร์ (Copper)", "มาร์คคริส (Marckris)", "ภีมวสุ (Peemwasu)"],
    answer: "ไทย (Thai)"
  },
  {
    question: "ใครมีข้อมูลว่า ชอบอ่านหนังสือ?",
    choices: ["ภูธัชชัย (Phutatchai)", "เน็กซ์ (Nex)", "เอเอ (AA)", "ขุนพล (Khunpol)"],
    answer: "เน็กซ์ (Nex)"
  },
  {
    question: "ใครมีข้อมูลว่า อดีตนักกีฬาไอซ์ฮอกกี้?",
    choices: ["คอปเปอร์ (Copper)", "ภูธัชชัย (Phutatchai)", "ไทย (Thai)", "ฮาร์ท (Heart)"],
    answer: "ภูธัชชัย (Phutatchai)"
  },
  {
    question: "ใครมีข้อมูลว่า ฉายาเหมียวเปอร์?",
    choices: ["คอปเปอร์ (Copper)", "เอเอ (AA)", "จินวุค (Jinwook)", "อลัน (Alan)"],
    answer: "คอปเปอร์ (Copper)"
  },
  {
    question: "ใครมีข้อมูลว่า เด็กอินเตอร์?",
    choices: ["ภีมวสุ (Peemwasu)", "เอเอ (AA)", "ไทย (Thai)", "จั๋งธีร์ (Jungt)"],
    answer: "เอเอ (AA)"
  }
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const scoreScreen = document.getElementById("scoreScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");
const questionCount = document.getElementById("questionCount");
const progressFill = document.getElementById("progressFill");

const finalScore = document.getElementById("finalScore");
const scoreLevel = document.getElementById("scoreLevel");
const scoreMessage = document.getElementById("scoreMessage");

let currentQuestionIndex = 0;
let score = 0;

// สลับหน้าให้เห็นทีละหน้าเท่านั้น
function showScreen(screenName) {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  scoreScreen.classList.add("hidden");

  if (screenName === "start") startScreen.classList.remove("hidden");
  if (screenName === "quiz") quizScreen.classList.remove("hidden");
  if (screenName === "score") scoreScreen.classList.remove("hidden");
}

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  showScreen("quiz");
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  scoreText.textContent = `Score: ${score}`;
  questionCount.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  progressFill.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
  feedback.textContent = "";
  nextBtn.classList.add("hidden");
}

function selectAnswer(button, correctAnswer) {
  const selectedAnswer = button.textContent;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
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
    feedback.textContent = "Correct! ตอบถูกแล้ว";
  } else {
    feedback.textContent = `Incorrect! คำตอบที่ถูกคือ ${correctAnswer}`;
  }

  scoreText.textContent = `Score: ${score}`;

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "See Result";
  } else {
    nextBtn.textContent = "Next Question";
  }

  nextBtn.classList.remove("hidden");
}

function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScoreScreen();
  }
}

function showScoreScreen() {
  showScreen("score");
  finalScore.textContent = `${score}/${questions.length}`;

  if (score === questions.length) {
    scoreLevel.textContent = "Ultimate BUS Fan";
    scoreMessage.textContent = "ยอดเยี่ยมมาก! คุณจำข้อมูลสมาชิกได้ครบทุกข้อ เป็นแฟนตัวจริงของ BUS เลย";
  } else if (score >= 9) {
    scoreLevel.textContent = "Super BUS Fan";
    scoreMessage.textContent = "เก่งมาก! คุณรู้จักสมาชิก BUS ได้ดีมากและจำรายละเอียดได้แม่นสุด ๆ";
  } else if (score >= 6) {
    scoreLevel.textContent = "Rising BUS Fan";
    scoreMessage.textContent = "ทำได้ดีมาก คุณเริ่มจำข้อมูลของสมาชิกได้แล้ว ลองเล่นอีกครั้งเพื่อเพิ่มคะแนน";
  } else {
    scoreLevel.textContent = "Beginner BUS Fan";
    scoreMessage.textContent = "ยังไม่เป็นไร ลองกลับไปอ่านข้อมูลสมาชิกอีกนิด แล้วกลับมาท้าทายใหม่ได้เลย";
  }
}

// เริ่มต้นต้องเห็นแค่หน้า Start
showScreen("start");

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", startGame);