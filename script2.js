const quizData = [
  {
    question: "What is my iranian name?",
    options: [
      { text: "Sam", img: "path/to/image1.jpg" },
      { text: "Poopak", img: "path/to/image2.jpg" },
      { text: "Navid", img: "path/to/image3.jpg" },
      { text: "Koochik", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "How many siblings do I have??",
    options: [
      { text: "0", img: "path/to/image1.jpg" },
      { text: "1", img: "path/to/image2.jpg" },
      { text: "2", img: "path/to/image3.jpg" },
      { text: "3", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What instrument do i play?",
    options: [
      { text: "Banjo", img: "path/to/image1.jpg" },
      { text: "Keyboard", img: "path/to/image2.jpg" },
      { text: "Accordion", img: "path/to/image3.jpg" },
      { text: "Oboe", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What is my favorite juice?",
    options: [
      { text: "Pineapple juice", img: "path/to/image1.jpg" },
      { text: "Apple juice", img: "path/to/image2.jpg" },
      { text: "Orange juice", img: "path/to/image3.jpg" },
      { text: "Grape juice", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What is my favorite sport?",
    options: [
      { text: "Basketball", img: "path/to/image1.jpg" },
      { text: "Football", img: "path/to/image2.jpg" },
      { text: "Tennis", img: "path/to/image3.jpg" },
      { text: "Volleyball", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What is my shoe size?",
    options: [
      { text: "40", img: "path/to/image1.jpg" },
      { text: "42", img: "path/to/image2.jpg" },
      { text: "46", img: "path/to/image3.jpg" },
      { text: "44", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What is my favorite Iranian food?",
    options: [
      { text: "Salad Shirazi", img: "path/to/image1.jpg" },
      { text: "Kotlet", img: "path/to/image2.jpg" },
      { text: "Halim", img: "path/to/image3.jpg" },
      { text: "Bastani Sonnati", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What was my Thesis about?",
    options: [
      { text: "Sports Betting", img: "path/to/image1.jpg" },
      { text: "E-commerce Growth Trends", img: "path/to/image2.jpg" },
      { text: "Consumer Behavior Analysis", img: "path/to/image3.jpg" },
      { text: "Data Mining Applications", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What is one of my weirdest fears?",
    options: [
      { text: "Anablephobia: fear of looking up", img: "path/to/image1.jpg" },
      { text: "Omphalophobia: fear of belly buttons", img: "path/to/image2.jpg" },
      { text: "Peladophobia: fear of bald people", img: "path/to/image3.jpg" },
      { text: "Arachibutyrophobia: fear of peanut butter actually getting stuck on the roof of your mouth", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
  {
    question: "What is my dream car?",
    options: [
      { text: "Shelby Cobra", img: "path/to/image1.jpg" },
      { text: "Chevrolet Corvette", img: "path/to/image2.jpg" },
      { text: "Porsche 911", img: "path/to/image3.jpg" },
      { text: "Fiat punto", img: "path/to/image4.jpg" },
    ],
    answer: "Chelo kabab",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i].text;

    const optionText = document.createTextNode(shuffledOptions[i].text);

    const optionImage = document.createElement("img");
    optionImage.src = shuffledOptions[i].img;
    optionImage.alt = shuffledOptions[i].text;

    option.appendChild(radio);
    option.appendChild(optionImage);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
          <p>
            <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
            <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
            <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
          </p>
        `;
  }

  resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
      `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
