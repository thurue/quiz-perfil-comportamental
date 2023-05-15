const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const corpo = document.getElementsByTagName("body")[0];
const main = document.getElementsByTagName("main")[0];
// const btnRestart = document.querySelector(".finish button");

let tipo_A = 0
let tipo_C = 0
let tipo_I = 0
let tipo_O = 0


import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;



function nextQuestion(e) {
  if (e.target.getAttribute("data-tipo") === "A") {
    tipo_A++;
  }
  else if (e.target.getAttribute("data-tipo") === "C") {
    tipo_C++;
  }
  else if (e.target.getAttribute("data-tipo") === "I") {
    tipo_I++;
  }
  else if (e.target.getAttribute("data-tipo") === "O") {
    tipo_O++;
  }
  e.target.style.scale = ".8"


  if (currentIndex < questions.length - 1) {
    currentIndex++;
    let timeout = setTimeout(loadQuestion, 100);
  } else {
    let timeout = setTimeout(finish, 1000)
      ;
  }
}


function finish() {

  let PERCENTUALtipo_A = (tipo_A * 4)
  let PERCENTUALtipo_C = (tipo_C * 4)
  let PERCENTUALtipo_I = (tipo_I * 4)
  let PERCENTUALtipo_O = (tipo_O * 4)

  textFinish.innerHTML = `você é <br> ${PERCENTUALtipo_A} % tubarrão <br> ${PERCENTUALtipo_C} % gato <br> ${PERCENTUALtipo_I} % águia <br> ${PERCENTUALtipo_O} % lobo`;
  content.style.display = "none";
  contentFinish.style.display = "grid";

  // contentFinish.style.maxHeight = "250px";
  main.style.maxWidth = "100%";

  corpo.style.display = "block"

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Águia', 'Gato', 'Tubarão', 'Lobo'],
      datasets: [{
        // label: 'seus tipos',
        backgroundColor: ['yellow', 'orange', 'red', 'blue'],
        // borderColor: '#ffff',
        data: [PERCENTUALtipo_I, PERCENTUALtipo_C, PERCENTUALtipo_A, PERCENTUALtipo_O],
      }],
    }
  });


  return {
    PERCENTUALtipo_A,
    PERCENTUALtipo_C,
    PERCENTUALtipo_I,
    PERCENTUALtipo_O,
  };
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `<button id="buton" class="answer" data-tipo="${answer.tipo}">
    ${answer.option}
    </button>`;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();

// const val1 = parseInt(PERCENTUALtipo_A)
