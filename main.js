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
let listSubmit = [];
const quiz = {
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
    // Lấy thời gian hiện tại
    var now = new Date().getTime();

    // Đặt thời gian kết thúc là 15 phút sau thời điểm hiện tại
    var endTime = new Date(now + 15 * 60 * 1000).getTime();

    // Cập nhật đồng hồ đếm ngược mỗi giây
    var x = setInterval(function () {
      // Lấy thời gian hiện tại
      var now = new Date().getTime();

      // Tính thời gian còn lại
      var distance = endTime - now;

      // Tính toán thời gian dưới dạng giờ, phút, giây
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Hiển thị thời gian còn lại trên trang web
      document.getElementById("timer").innerHTML =
        hours + ":" + minutes + ":" + seconds;

      // Khi thời gian kết thúc, hiển thị thông báo
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000); // Mỗi giây cập nhật một lần
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
      });
    });
    quizQuestions[0].click();
  },
  handleAnswer: function () {
    quizAnswers.forEach((answer, index) => {
      answer.addEventListener("click", function () {
        quizAnswers.forEach((item) => {
          item.classList.remove("active");
        });
        answer.classList.add("active");
        quizQuestions[currentIndex].classList.add("selected");
        listSubmit[currentIndex] = index;
        quiz.handleProgress();
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
    quizSubmit.addEventListener("click", function () {
      const progressLenght = listSubmit.filter((item) => item >= 0);
      console.log(progressLenght);
      if (progressLenght.length == questions.length) {
        results.forEach((item, index) => {
          if (questions[index].answers[listSubmit[index]] === item.answer) {
            return;
          } else {
            quizQuestions[index].classList.add("false");
          }
        });
      } else {
        alert("Bạn chưa chọn hết các cậu trả lời");
      }
    });
  },
  handleProgress: function () {
    const progressLenght = listSubmit.filter((item) => item >= 0);
    const r = quizProgress.getAttribute("r");
    quizProgress.style = `stroke-dasharray: ${
      (2 * Math.PI * r * progressLenght.length) / questions.length
    } 99999`;
    quizProgressText.innerText = `${progressLenght.length}/${questions.length}`;
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
    this.render();
    this.handle();
  },
};

quiz.start();
