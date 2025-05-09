const ans = ["A", "B", "C", "D", "D", "C", "B", "A", "B", "D"];
const total = ans.length;
let submitted = false; // to prevent double submit

function getSelectedAnswer(questionNum) {
  const selected = document.querySelector(`input[name="q${questionNum}"]:checked`);
  return selected ? selected.value : "E";
}

function score() {
  let scoreCount = 0;
  for (let i = 1; i <= total; i++) {
    if (getSelectedAnswer(i) === ans[i - 1]) {
      scoreCount++;
    }
  }
  return scoreCount;
}

function checkResult() {
  if (submitted) return; // prevent double submission
  submitted = true;

  clearInterval(timer); // stop the timer

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const resultElement = document.getElementById("hh");
  const finalScore = score();
  resultElement.innerHTML = "✅" + finalScore + "/10" ;

  if (finalScore === 10) {
    resultElement.style.color = "goldenrod";
  } else {
    resultElement.style.color = finalScore < 5 ? "red" : "green";
  }

  document.getElementById("submitBtn").disabled = true;
}

// TIMER logic
let timeLeft = 20;
const timerElement = document.getElementById("timer");

const timer = setInterval(() => {
  timeLeft--;
  timerElement.textContent = `🕒Time left: ${timeLeft}s`;
  if (timeLeft < 10) {
    timerElement.style.color = "red";
  } else {
    timerElement.style.color = "green";
  }

  if (timeLeft <= 0) {
    clearInterval(timer);
    checkResult();
  }
}, 1000);
