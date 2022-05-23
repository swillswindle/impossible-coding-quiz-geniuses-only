let i = 0;
let questionContainer;
let timer;
let time = 30;
let score = 0;
let hiscores = localStorage.getItem("scores") || [];
console.log(hiscores);
let timeupdate;
function startQuiz() {
  questionContainer = document.getElementById("question-container");
  timer = document.getElementById("timer");
  timer.innerHTML = `
    <h2>Time Remaining: 30 Seconds</h2>
    `;
  timeupdate = setInterval(function () {
    time--;
    timer.innerHTML = `
    <h2>Time Remaining: ${time} Seconds</h2>
    `;
    if (time === 0) {
      clearInterval(timeupdate);
      alert("Time's up!");
      showResults();
    }
  }, 1000);
  showQuestion();
}

function showQuestion() {
  let question = questions[i];
  questionContainer.innerHTML = "<h2>" + question.question + "</h2>";
  question.answers.forEach(function (answer) {
    questionContainer.innerHTML +=
      "<button class='answer-button'>" + answer + "</button>";
  });
  revealAnswer();
}

function revealAnswer() {
  let answerButtons = document.querySelectorAll(".answer-button");
  answerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let correctAnswer = questions[i].correctAnswer;
      if (button.textContent === correctAnswer) {
        score++;
        time += 2;
        alert("Correct!");
      } else {
        time -= 6;
        alert("Wrong!");
      }
      i++;
      if (i < questions.length) {
        showQuestion();
      } else {
        showResults();
      }
    });
  });
}

function showResults() {
  clearInterval(timeupdate);
  questionContainer.innerHTML = `
  <h2>You got ${score} out of ${questions.length} correct!</h2>
    <h3> High Scores: </h3>
    <ol id="high-scores">
    
    </ol>
    
  <button class="restart-button">Restart Quiz</button>
  <button class="save-button">Save Score</button>
  
  `;
    revealHighScores();
  let restartButton = document.querySelector(".restart-button");
  restartButton.addEventListener("click", function () {
    location.reload();
  });
  let saveButton = document.querySelector(".save-button");
  saveButton.addEventListener("click", function () {
    let inits = prompt("Enter your initials");
    let scoreObj = [
        {
            initials: inits,
            score: score,
            time: time,
        },
    ]
    localStorage.setItem("scores", JSON.stringify(scoreObj), JSON.stringify(hiscores));
    hiscores = JSON.parse(localStorage.getItem("scores"));
    console.log(hiscores);
    
    alert("Score Saved!");
    revealHighScores();
  });
}

function revealHighScores() {
  let highScores = document.getElementById("high-scores");
  hiscores.forEach((score) => {
    highScores.innerHTML += `
    <li>${score.initials} - ${score.score} - ${score.time}</li>
    `;
  });
}