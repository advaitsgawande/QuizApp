const questions = [
  {
    question:
      "Which function among the following lets to register a function to be invoked once?",
    answers: [
      { text: "setTimeout()", correct: true },
      { text: "setTotaltime()", correct: false },
      { text: "setInterval()", correct: false },
      { text: "None of the mentioned", correct: false },
    ],
  },
  {
    question:
      "Which is the handler method used to invoke when uncaught JavaScript exceptions occur?",
    answers: [
      { text: "onHalt()", correct: false },
      { text: "onError()", correct: true },
      { text: "Both onHalt() and onError()", correct: false },
      { text: "None of the mentioned", correct: false },
    ],
  },
  {
    question:
      "Which property is used to obtain browser vendor and version information?",
    answers: [
      { text: "Modal", correct: false },
      { text: "Version", correct: false },
      { text: "Browser", correct: false },
      { text: "Navigator", correct: true },
    ],
  },
  {
    question: "The Property of JSON() method is?",
    answers: [
      { text: "It can be invoked manually as object.JSON().", correct: false },
      {
        text: "It will be automatically invoked by the compiler.",
        correct: false,
      },
      {
        text: "It is invoked automatically by the JSON.stringify() method.",
        correct: true,
      },
      { text: "It cannot be invoked in any form.", correct: false },
    ],
  },
  {
    question: "How many elements can a valid react component return?",
    answers: [
      { text: "React does not return element.", correct: false },
      { text: " One Element.", correct: true },
      { text: " More than 1 element.", correct: false },
      { text: "None of the mentioned.", correct: false },
    ],
  },
  {
    question:
      " In which condition is the React.js Lifecycle method static getDerivedSateFromProps(props, state) is called?",
    answers: [
      { text: "When the state of the component is updated.", correct: false },
      {
        text: " When a component is created for the first time.",
        correct: false,
      },
      { text: "Both of the mentioned.", correct: true },
      { text: " None of the mentioned.", correct: false },
    ],
  },
  {
    question: "What is the correct syntax to write expression in JSX?",
    answers: [
      { text: "[ expression ]", correct: false },
      { text: "{ expression }", correct: true },
      { text: "{{ expression }}", correct: false },
      { text: "_expression", correct: false },
    ],
  },
  {
    question: "What are Props?",
    answers: [
      {
        text: "Props are arguments passed into React components.",
        correct: true,
      },
      { text: "Props are functions in the ReactJS.", correct: false },
      {
        text: "Props are used to returns multiple values from the function",
        correct: false,
      },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question:
      " In ES6 – The class properties are assigned inside a ___ method.",
    answers: [
      { text: "props()", correct: false },
      { text: "properties()", correct: false },
      { text: "constructor()", correct: true },
      { text: "react-properties()", correct: false },
    ],
  },
  {
    question: "Which is the correct arrow function to add two numbers?",
    answers: [
      { text: "add = (a,b) => a+b;", correct: false },
      { text: "add = (a,b) => return a+b;", correct: false },
      { text: "add = (a,b) => { return a+b;}", correct: false },
      { text: "Both A. and C.", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const fireworksContainer = document.getElementById("fireworks-container");
const sadAnimationContainer = document.getElementById("sad-animation");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  if (score >= 1) {
    questionElement.innerHTML = `Yayy!! You scored ${score} out of ${questions.length}, You passed the quiz.`;
    showFireworks();
  } else {
    questionElement.innerHTML = `Opps!! You scored ${score} out of ${questions.length}, You Failed the quiz.`;
    showSadAnimation();
  }
}

function showSadAnimation() {
  sadAnimationContainer.style.display = "block";
  sadAnimationContainer.innerHTML =
    '<img src="C:/Users/User/Downloads/image.png">';
}

function showFireworks() {
  fireworksContainer.style.display = "block";

  const particleCount = 100; // Number of particles for the fireworks effect

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("firework-particle");
    fireworksContainer.appendChild(particle);

    // Set initial position for each particle
    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;
    particle.style.left = initialX + "px";
    particle.style.top = initialY + "px";

    // Set random colors for each particle
    const randomColor = getRandomColor();
    particle.style.backgroundColor = randomColor;

    // Animate the particle
    animateParticle(particle);
  }
  const container = document.querySelector(".app");
  const fireworks = new Fireworks.default(container);
  fireworks.start();
}

// Function to animate each particle
function animateParticle(particle) {
  const animationDuration = 5000; // Duration of the particle animation (in milliseconds)
  const containerWidth = fireworksContainer.offsetWidth;
  const containerHeight = fireworksContainer.offsetHeight;

  // Calculate the random target position for the particle
  const targetX = Math.random() * containerWidth;
  const targetY = Math.random() * containerHeight;

  // Apply CSS transition to animate the particle to the target position
  particle.style.transition = `transform ${animationDuration}ms ease-in-out`;
  particle.style.transform = `translate(${targetX}px, ${targetY}px)`;

  // Remove the particle from the DOM after the animation ends
  setTimeout(() => {
    particle.parentNode.removeChild(particle);
  }, animationDuration);
}

// Helper function to generate random color values
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
