const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const feedback = document.getElementById('feedback');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

const quizData = [
  {
    question: "Siapa pencipta bahasa pemrograman Java?",
    answers: [
      { text: "Dennis Ritchie", correct: false },
      { text: "Guido van Rossum", correct: false },
      { text: "Bjarne Stroustrup", correct: false },
      { text: "James Gosling", correct: true }
    ]
  },
  {
    question: "Apa kepanjangan dari HTML?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperTool Multi Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false }
    ]
  },
  {
    question: "Framework CSS yang populer adalah?",
    answers: [
      { text: "React", correct: false  },
      { text: "Laravel", correct: false },
      { text: "Bootstrap", correct: true },
      { text: "Flask", correct: false }
    ]
  },
  {
    question: "Apa fungsi utama dari Git?",
    answers: [
      { text: "Mengelola versi kode", correct: true },
      { text: "Membuat desain UI", correct: false },
      { text: "Menjalankan server", correct: false },
      { text: "Membuat database", correct: false }
    ]
  },
  {
    question: "Android dikembangkan oleh perusahaan apa?",
    answers: [
      { text: "Google", correct: true },
      { text: "Apple", correct: false },
      { text: "Microsoft", correct: false },
      { text: "IBM", correct: false }
    ]
  },

  {
    question: "Apa warna utama logo Google?",
    answers: [
      { text: "Hitam dan Putih", correct: false },
      { text: "Merah, Kuning, Hijau, Biru", correct: true },
      { text: "Merah dan Kuning", correct: false },
      { text: "Biru dan Hijau", correct: false }
    ]
  },
  {
    question: "Apa fungsi utama dari komputer?",
    answers: [
      { text: "Mengolah data menjadi informasi", correct: true },
      { text: "Hanya untuk bermain game", correct: false },
      { text: "Sebagai pajangan", correct: false },
      { text: "Menggambar manual", correct: false }
    ]
  },
  {
    question: "Perangkat yang digunakan untuk mengetik di komputer adalah?",
    answers: [
      { text: "Monitor", correct: false },
      { text: "Mouse", correct: false },
      { text: "Keyboard", correct: true },
      { text: "Speaker", correct: false }
    ]
  },
  {
    question: "Apa fungsi dari tombol Ctrl + C di komputer?",
    answers: [
      { text: "Menyalin teks", correct: true },
      { text: "Menempelkan teks", correct: false },
      { text: "Menghapus teks", correct: false },
      { text: "Menutup aplikasi", correct: false }
    ]
  },
  {
    question: "Bahasa pemrograman yang digunakan untuk styling tampilan web adalah?",
    answers: [
      { text: "HTML", correct: false },
      { text: "SQL", correct: false },
      { text: "CSS", correct: true },
      { text: "C++", correct: false }
    ]
  }
];

// Mulai kuis
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.classList.add('hide');
  questionContainer.classList.remove('hide');
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn-answer');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  feedback.textContent = '';
  answerButtons.innerHTML = '';
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  
  if (correct) {
    selectedButton.classList.add('correct');
    feedback.innerHTML = "✅ Benar!";
    score++;
  } else {
    selectedButton.classList.add('wrong');
    feedback.innerHTML = "❌ Salah!";
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  if (currentQuestionIndex < quizData.length - 1) {
    nextButton.classList.remove('hide');
  } else {
    setTimeout(showResult, 1000);
  }
}

function showResult() {
  questionContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  resultContainer.innerHTML = `Skor Anda: ${score}/${quizData.length} <br> ${
    score === 10
      ? "🎉 Sempurna! Kamu luar biasa!"
      : score >= 7
      ? "😎 Hebat! Kamu paham banget."
      : score >= 5
      ? "🙂 Lumayan, ayo tingkatkan lagi!"
      : "😅 Jangan menyerah, coba lagi!"
  }`;

  //Easter Egg
  if (score === quizData.length) {
    setTimeout(() => {
      alert('💡 Kamu membuka MODE JENIUS!');
      document.body.style.backgroundColor = 'gold';
      document.body.innerHTML += "<h1 style='text-align:center; color:blue;'>✨ GENIUS MODE ACTIVATED ✨</h1>";
    }, 500);
  }

  startButton.textContent = "Ulangi Kuis";
  startButton.classList.remove('hide');
}
  
