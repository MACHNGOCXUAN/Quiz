let questions = [
  {
    quiz_id: 1,
    question:
      "You can learn a lot about the local _______ by talking to local people.",
    answers: ["territory", "area", "land", "nation"],
  },
  {
    quiz_id: 2,
    question:
      "It's good to have someone to ________ you when you are visiting a new place.",
    answers: ["lead", "take", "guide", "bring"],
  },
  {
    quiz_id: 3,
    question:
      "When you ______ your destination, your tour guide will meet you at the airport.",
    answers: ["arrive", "reach", "get", "achieve"],
  },
  {
    quiz_id: 4,
    question: "It can be quite busy here during the tourist ______",
    answers: ["season", "phase", "period", "stage"],
  },
  {
    quiz_id: 5,
    question:
      "Make sure you _______ a hotel before you come to our island, especially in the summer.",
    answers: ["book", "keep", "put", "buy"],
  },
  {
    quiz_id: 6,
    question: "Captain Cook discovered Australia on a _______ to the Pacific.",
    answers: ["vacation", "travel", "cruise", "voyage"],
  },
  {
    quiz_id: 7,
    question:
      " Most tourist attractions in London charge an admission ________.",
    answers: ["fare", "ticket", "fee", "pay"],
  },
  {
    quiz_id: 8,
    question: "The hotel where we are _______ is quite luxurious.",
    answers: ["living", "existing", "remaining", "staying"],
  },
  {
    quiz_id: 9,
    question: "Is English an ________ language in your country?",
    answers: ["mother", "official", "living", "old"],
  },
  {
    quiz_id: 10,
    question: "He spoke a ______ of French that we found hard to understand.",
    answers: ["slang", "jargon", "dialect", "language"],
  },
];

const results = [
  {
    quiz_id: 1,
    answer: "area",
  },
  {
    quiz_id: 3,
    answer: "reach",
  },
  {
    quiz_id: 2,
    answer: "guide",
  },
  {
    quiz_id: 4,
    answer: "season",
  },
  {
    quiz_id: 5,
    answer: "book",
  },
  {
    quiz_id: 6,
    answer: "voyage",
  },
  {
    quiz_id: 7,
    answer: "fee",
  },
  {
    quiz_id: 8,
    answer: "staying",
  },
  {
    quiz_id: 9,
    answer: "official",
  },
  {
    quiz_id: 10,
    answer: "dialect",
  },
];

const quizTimer = document.querySelector("#timer");
const quizProgress = document.querySelector("#progress");
const quizProgressText = document.querySelector("#progress_text");
const quizSubmit = document.querySelector("#quiz_submit");
const quizCount = document.querySelector(".quiz_question h5");
const quizTitle = document.querySelector("#quiz_title");
const quizPrev = document.querySelector("#quiz_prev");
const quizNext = document.querySelector("#quiz_next");
const quizQuestionList = document.querySelector(".quiz_numbers ul");
const quizAnswers = document.querySelectorAll(".quiz_question ul li");
const quizAnswersItem = document.querySelectorAll(".quiz_answer_item");
let quizQuestions = document.querySelectorAll(".quiz_numbers ul li");

let currentIndex = null;
let isSubmit = false;
let listResults = [];
let listSubmit = [];

function randomArray(array) {
  return (array = array.sort(() => Math.random() - Math.random()));
}
const quiz = {
  randomQuestion: function () {
    questions = randomArray(questions);
    questions.forEach((q) => {
      q.answers = randomArray(q.answers);
    });
    console.log(questions);
  },

  renderCurrentQuestion: function () {
    quizCount.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
    quizTitle.innerHTML = questions[currentIndex].question;
    quizAnswersItem.forEach((answer, index) => {
      answer.innerHTML = questions[currentIndex].answers[index];
    });
  },
  renderQuestionList: function () {
    let render = "";
    questions.forEach((question, index) => {
      render += `<li>${index + 1}</li>`;
    });
    quizQuestionList.innerHTML = render;
    quizQuestions = document.querySelectorAll(".quiz_numbers ul li");
  },

  renderProgress: function () {
    quizProgress.style = `stroke-dasharray: 0 99999`;
    quizProgressText.innerText = `0/${questions.length}`;
  },

  renderTimer: function () {
    var timer = 15 * 60;
    let _this = this;
    // Lấy thẻ p có id là "timer"
    var countdownElement = document.getElementById("timer");

    // Hàm cập nhật thời gian
    function updateTimer() {
      var minutes = Math.floor(timer / 60);
      var seconds = timer % 60;

      // Định dạng thời gian thành chuỗi HH:MM:SS
      var timerString =
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds;

      // Gán thời gian đã định dạng vào thẻ p
      countdownElement.innerHTML = timerString;

      // Giảm thời gian mỗi giây
      timer--;
      // Kiểm tra nếu hết thời gian
      if (timer < 0) {
        countdownElement.innerHTML = "Hết thời gian!";
        _this.handleCheckResults();
      }
      if (isSubmit) {
        clearInterval(intervalId);
      }
    }

    // Gọi hàm updateTimer mỗi giây
    var intervalId = setInterval(updateTimer, 1000);
  },
  handleQuestionList: function () {
    quizQuestions.forEach((item, index) => {
      item.addEventListener("click", function () {
        item.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
        quizQuestions.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
        currentIndex = index;
        quiz.renderCurrentQuestion();
        quizAnswers.forEach((item) => {
          item.classList.remove("active");
        });
        const selected = listSubmit[currentIndex];
        selected >= 0 && quizAnswers[selected].click();
        if (isSubmit) {
          quiz.renderResults();
        }
      });
    });
    quizQuestions[0].click();
  },
  handleAnswer: function () {
    quizAnswers.forEach((answer, index) => {
      answer.addEventListener("click", function () {
        if (!isSubmit) {
          quizAnswers.forEach((item) => {
            item.classList.remove("active");
          });
          answer.classList.add("active");
          quizQuestions[currentIndex].classList.add("selected");
          listSubmit[currentIndex] = index;
          quiz.handleProgress();
        } else {
          return;
        }
      });
    });
  },
  handleNext: function () {
    quizNext.addEventListener("click", function () {
      ++currentIndex;
      if (currentIndex == questions.length) {
        currentIndex = 0;
      }
      quizQuestions[currentIndex].click();
    });
  },

  handlePrev: function () {
    quizPrev.addEventListener("click", () => {
      --currentIndex;
      if (currentIndex < 0) {
        currentIndex = questions.length - 1;
      }
      quizQuestions[currentIndex].click();
    });
  },

  handleSubmit: function () {
    let count = 0;
    quizSubmit.addEventListener("click", function () {
      const progressLenght = listSubmit.filter((item) => item >= 0);
      if (progressLenght.length == questions.length) {
        questions.forEach((item, index) => {
          const result = results.find((r) => r.quiz_id === item.quiz_id);
          if (item.answers[listSubmit[index]] === result.answer) {
            listResults[index] = listSubmit[index];
            count++;
          } else {
            quizQuestions[index].classList.add("false");
            listResults[index] = item.answers.indexOf(result.answer);
          }
        });
      } else {
        alert("Bạn chưa chọn hết các cậu trả lời");
      }
      isSubmit = true;
      quiz.handleProgress(count);
    });
  },
  renderResults: function () {
    if (listResults[currentIndex] === listSubmit[currentIndex]) {
      quizAnswers.forEach((item) => {
        item.classList.remove("false");
      });
      quizAnswers[listResults[currentIndex]].classList.add("active");
    } else {
      quizAnswers.forEach((item) => {
        item.classList.remove("active");
        item.classList.remove("false");
      });
      quizAnswers[listResults[currentIndex]].classList.add("active");
      quizAnswers[listSubmit[currentIndex]].classList.add("false");
    }
  },
  handleProgress: function (count) {
    const r = quizProgress.getAttribute("r");

    if (!isSubmit) {
      const progressLenght = listSubmit.filter((item) => item >= 0);
      quizProgress.style = `stroke-dasharray: ${
        (2 * Math.PI * r * progressLenght.length) / questions.length
      } 99999`;
      quizProgressText.innerText = `${progressLenght.length}/${questions.length}`;
    } else {
      const progressLenght = listSubmit.filter((item) => item >= 0);
      quizProgress.style = `stroke-dasharray: ${
        (2 * Math.PI * r * count) / questions.length
      } 99999`;
      quizProgressText.innerText = `${count}/${questions.length}`;
    }
  },

  render: function () {
    this.renderQuestionList();
    this.renderProgress();
    this.renderTimer();
  },

  handle: function () {
    this.handleQuestionList();
    this.handleAnswer();
    this.handleNext();
    this.handlePrev();
    this.handleSubmit();
  },

  start: function () {
    this.randomQuestion();
    this.render();
    this.handle();
  },
};

quiz.start();
